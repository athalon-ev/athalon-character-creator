import * as R from 'ramda'

import type { Dependencies } from '../dependencies'
export const getAvatar = R.curry(async (dependencies: Dependencies, minecraftAccountUuid: string) => {
    const avatar = await dependencies.config.minecraftAvatarClient.get(
        `/renders/body/${minecraftAccountUuid}?overlay=true&scale=5`,
        {
            responseType: 'arraybuffer'
        }
    )
    return Buffer.from(avatar.data, 'binary')
})

export const saveAvatar = R.curry(async (dependencies: Dependencies, minecraftAccountUuid: string, fileName: string) => {
    const avatar = await getAvatar(dependencies, minecraftAccountUuid)
    await dependencies.lib.fs.ensureDir(dependencies.config.charactersFolderPath)
    const savePath = dependencies.lib.path.join(dependencies.config.charactersFolderPath, `${fileName}.png`)
    return dependencies.lib.fs.writeFile(savePath, avatar)
})

export const getUuidByUsername = R.curry(async (dependencies: Dependencies, minecraftName) => {
    const response = await dependencies.config.mojangApiClient.get(minecraftName)
    return response.data.id
})
