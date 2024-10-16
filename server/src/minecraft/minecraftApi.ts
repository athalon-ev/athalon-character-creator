import type { Dependencies } from '../dependencies'

export const getUUIDForName = async (dependencies: Dependencies, username: string) => {
    const response = await dependencies.config.mojangApiClient.get(`/users/profiles/minecraft/${encodeURIComponent(username)}`)
    return response.data.id
}
export const getSkinBuffer = async (dependencies: Dependencies, uuid: string) => {
    const response = await dependencies.config.sessionApiClient.get(`/session/minecraft/profile/${uuid}`)
    const lastSkinBase64 = response.data.properties[0].value
    const lastSkin = JSON.parse(Buffer.from(lastSkinBase64, 'base64').toString('binary'))
    const skinUrl = lastSkin.textures.SKIN.url
    const skin = await dependencies.lib.axios.get(
        skinUrl,
        {
            responseType: 'arraybuffer'
        }
    )
    return Buffer.from(skin.data, 'binary')
}