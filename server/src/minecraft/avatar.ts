import * as R from 'ramda'

import type { Dependencies } from '../dependencies'
export const getAvatar = R.curry(async (dependencies: Dependencies, id: string) => {
    const avatar = await dependencies.config.miencraftAvatarClient.get(
        `/renders/body/${id}?overlay=true&scale=5`,
        {
            responseType: 'arraybuffer'
        }
    )
    return Buffer.from(avatar.data, 'binary')
})

export const saveAvatar = R.curry(async (dependencies: Dependencies, id: string) => {
    const avatar = await getAvatar(dependencies, id)
    await dependencies.lib.fs.ensureDir(dependencies.config.charactersFolderPath)
    const savePath = dependencies.lib.path.join(dependencies.config.charactersFolderPath, `${id}.png`)
    return dependencies.lib.fs.writeFile(savePath, avatar)
})