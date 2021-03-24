import type { Canvas, Image } from 'canvas'
// import type { Dependencies } from '../dependencies'
import { createCanvas, loadImage } from 'canvas'
import { promisify } from 'util'
import * as fs from 'fs-extra'

// set alpha values to 255
const removeTransparency = (canvas: Canvas) => {
    const ctx = canvas.getContext('2d')
    const imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imagedata.data
    // data is [r,g,b,a, r,g,b,a, *]
    for (let i = 0; i < data.length; i += 4) {
        // usually we would have to check for alpha = 0
        // and set color to black here
        // but node-canvas already does that for us

        // remove transparency
        data[i + 3] = 255
    }
    ctx.putImageData(imagedata, 0, 0)
    return canvas
}

// checks if the given +canvas+ has any pixel that is not fully opaque
const hasTransparency = (canvas: Canvas) => {
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    for (let i = 3; i < imageData.length; i += 4) {
        if (imageData[i] < 255) {
            // found pixel with translucent alpha value
            return true
        }
    }
    return false
}

// resize the +src+ canvas by +scale+
// returns a new canvas
const resize = (src: Canvas, scale: number) => {
    const dst = createCanvas(scale * src.width, scale * src.height)
    const context = dst.getContext('2d')

    // don't blur on resize
    context.patternQuality = 'fast'

    context.drawImage(src, 0, 0, src.width * scale, src.height * scale)
    return dst
}

// get a rectangular part of the +src+ canvas
// the returned canvas is scaled by factor +scale+
const getPart = (src: Image, x: number, y: number, width: number, height: number, scale: number) => {
    const dst = createCanvas(scale * width, scale * height)
    const context = dst.getContext('2d')
    // don't blur on resize
    context.patternQuality = 'fast'
    context.drawImage(src, x, y, width, height, 0, 0, width * scale, height * scale)
    return dst
}

// flip the +src+ canvas horizontally
const flip = (src: Canvas) => {
    const dst = createCanvas(src.width, src.height)
    const context = dst.getContext('2d')
    context.scale(-1, 1)
    context.drawImage(src, -src.width, 0)
    return dst
}

// skew for isometric perspective
const skewA = 26 / 45 // 0.57777777
const skewB = skewA * 2 // 1.15555555

// export const saveAvatar = R.curry(async (dependencies: Dependencies, minecraftAccountUuid: string, fileName: string) => {
//     const avatar = await getAvatar(dependencies, minecraftAccountUuid)
//     await dependencies.lib.fs.ensureDir(dependencies.config.charactersFolderPath)
//     const savePath = dependencies.lib.path.join(dependencies.config.charactersFolderPath, `${fileName}.png`)
//     return dependencies.lib.fs.writeFile(savePath, avatar)
// })

export const drawModel = async (img: string | Buffer, scale: number, overlay: boolean, isBody: boolean, slim: boolean) => {
    const canvas = createCanvas(scale * 20, scale * (isBody ? 45.1 : 18.5))

    const ctx = canvas.getContext('2d')
    const skin = await loadImage(img)
    const oldSkin = skin.height == 32
    const armWidth = slim ? 3 : 4

    const headTop = resize(removeTransparency(getPart(skin, 8, 0, 8, 8, 1)), scale)
    const headFront = resize(removeTransparency(getPart(skin, 8, 8, 8, 8, 1)), scale)
    const headRight = resize(removeTransparency(getPart(skin, 0, 8, 8, 8, 1)), scale)

    const armRightTop = resize(removeTransparency(getPart(skin, 44, 16, armWidth, 4, 1)), scale)
    const armRightFront = resize(removeTransparency(getPart(skin, 44, 20, armWidth, 12, 1)), scale)
    const armRightSide = resize(removeTransparency(getPart(skin, 40, 20, 4, 12, 1)), scale)

    const armLeftTop = oldSkin ? flip(armRightTop) : resize(removeTransparency(getPart(skin, 36, 48, armWidth, 4, 1)), scale)
    const armLeftFront = oldSkin ? flip(armRightFront) : resize(removeTransparency(getPart(skin, 36, 52, armWidth, 12, 1)), scale)

    const legRightFront = resize(removeTransparency(getPart(skin, 4, 20, 4, 12, 1)), scale)
    const legRightSide = resize(removeTransparency(getPart(skin, 0, 20, 4, 12, 1)), scale)

    const legLeftFront = oldSkin ? flip(legRightFront) : resize(removeTransparency(getPart(skin, 20, 52, 4, 12, 1)), scale)

    const bodyFront = resize(removeTransparency(getPart(skin, 20, 20, 8, 12, 1)), scale)

    if (overlay) {
        if (hasTransparency(getPart(skin, 32, 0, 32, 32, 1))) {
            // render head overlay
            headTop.getContext('2d').drawImage(getPart(skin, 40, 0, 8, 8, scale), 0, 0)
            headFront.getContext('2d').drawImage(getPart(skin, 40, 8, 8, 8, scale), 0, 0)
            headRight.getContext('2d').drawImage(getPart(skin, 32, 8, 8, 8, scale), 0, 0)
        }

        if (!oldSkin) {
            // See #117
            // if MC-89760 gets fixed, we can (probably) simply check the whole skin for transparency

            const bodyRegion = getPart(skin, 16, 32, 32, 16, 1)
            const rightArmRegion = getPart(skin, 48, 48, 16, 16, 1)
            const leftArmRegion = getPart(skin, 40, 32, 16, 16, 1)
            const rightLegRegion = getPart(skin, 0, 32, 16, 16, 1)
            const leftLegRegion = getPart(skin, 0, 48, 16, 16, 1)

            if (hasTransparency(bodyRegion)) {
                // render body overlay
                bodyFront.getContext('2d').drawImage(getPart(skin, 20, 36, 8, 12, scale), 0, 0)
            }

            if (hasTransparency(rightArmRegion)) {
                // render right arm overlay
                armRightTop.getContext('2d').drawImage(getPart(skin, 44, 32, armWidth, 4, scale), 0, 0)
                armRightFront.getContext('2d').drawImage(getPart(skin, 44, 36, armWidth, 12, scale), 0, 0)
                armRightSide.getContext('2d').drawImage(getPart(skin, 40, 36, 4, 12, scale), 0, 0)
            }

            if (hasTransparency(leftArmRegion)) {
                // render left arm overlay
                armLeftTop.getContext('2d').drawImage(getPart(skin, 36 + 16, 48, armWidth, 4, scale), 0, 0)
                armLeftFront.getContext('2d').drawImage(getPart(skin, 36 + 16, 52, armWidth, 12, scale), 0, 0)
            }

            if (hasTransparency(rightLegRegion)) {
                // render right leg overlay
                legRightFront.getContext('2d').drawImage(getPart(skin, 4, 36, 4, 12, scale), 0, 0)
                legRightSide.getContext('2d').drawImage(getPart(skin, 0, 36, 4, 12, scale), 0, 0)
            }

            if (hasTransparency(leftLegRegion)) {
                // render left leg overlay
                legLeftFront.getContext('2d').drawImage(getPart(skin, 4, 52, 4, 12, scale), 0, 0)
            }
        }
    }

    let x = 0
    let y = 0
    let z = 0

    const zOffset = scale * 3
    const xOffset = scale * 2

    if (isBody) {
        // pre-render front onto separate canvas
        const front = createCanvas(scale * 16, scale * 24)
        const frontc = front.getContext('2d')
        frontc.patternQuality = 'fast'

        frontc.drawImage(armRightFront, (4 - armWidth) * scale, 0 * scale, armWidth * scale, 12 * scale)
        frontc.drawImage(armLeftFront, 12 * scale, 0 * scale, armWidth * scale, 12 * scale)
        frontc.drawImage(bodyFront, 4 * scale, 0 * scale, 8 * scale, 12 * scale)
        frontc.drawImage(legRightFront, 4 * scale, 12 * scale, 4 * scale, 12 * scale)
        frontc.drawImage(legLeftFront, 8 * scale, 12 * scale, 4 * scale, 12 * scale)

        // top
        x = xOffset + scale * 2
        y = scale * -armWidth
        z = zOffset + scale * 8
        ctx.setTransform(1, -skewA, 1, skewA, 0, 0)
        ctx.drawImage(armRightTop, y - z - 0.5, x + z, armRightTop.width + 1, armRightTop.height + 1)

        y = scale * 8
        ctx.drawImage(armLeftTop, y - z, x + z, armLeftTop.width, armLeftTop.height + 1)

        // right side
        ctx.setTransform(1, skewA, 0, skewB, 0, 0)
        x = xOffset + scale * 2
        y = 0
        z = zOffset + scale * 20
        ctx.drawImage(legRightSide, x + y, z - y, legRightSide.width, legRightSide.height)

        x = xOffset + scale * 2
        y = scale * -armWidth
        z = zOffset + scale * 8
        ctx.drawImage(armRightSide, x + y, z - y - 0.5, armRightSide.width, armRightSide.height + 1)

        // front
        z = zOffset + scale * 12
        y = 0
        ctx.setTransform(1, -skewA, 0, skewB, 0, skewA)
        ctx.drawImage(front, y + x, x + z - 0.5, front.width, front.height)
    }

    // head top
    x = xOffset
    y = -0.5
    z = zOffset
    ctx.setTransform(1, -skewA, 1, skewA, 0, 0)
    ctx.drawImage(headTop, y - z, x + z, headTop.width, headTop.height + 1)

    // head front
    x = xOffset + 8 * scale
    y = 0
    z = zOffset - 0.5
    ctx.setTransform(1, -skewA, 0, skewB, 0, skewA)
    ctx.drawImage(headFront, y + x, x + z, headFront.width, headFront.height)

    // head right
    x = xOffset
    y = 0
    z = zOffset
    ctx.setTransform(1, skewA, 0, skewB, 0, 0)
    ctx.drawImage(headRight, x + y, z - y - 0.5, headRight.width + 0.5, headRight.height + 1)

    const buffer = promisify<Buffer>(canvas.toBuffer.bind(canvas))
    return buffer()
}
