import type { Dependencies } from '../dependencies'
import * as R from 'ramda'
import type { Skin, SkinDTO } from '../types'

export const create = R.curry(async (dependencies: Dependencies, skin: SkinDTO,) => {
    const db = await dependencies.services.databaseService.getSkinDatabase(dependencies)
    const id = dependencies.lib.nanoid.nanoid()
    const renderedSkin = await dependencies.services.skinRenderer.drawModel(skin.originalSkin, 5, true, true, false)
    await dependencies.lib.fs.writeFile(`${dependencies.config.charactersFolderPath}/skin.png`, b)

    await dependencies.services.databaseService.create(db, )
    return id
})

export const getOnlineSkinForName = async (dependencies: Dependencies, minecraftName: string) => {
    const uuid = await dependencies.services.minecraftApi.getUUIDForName(dependencies, minecraftName)
    return dependencies.services.minecraftApi.getSkinBuffer(dependencies, uuid)
}
// return dependencies.lib.fs.writeFile(path, skin)

export const render = async (dependencies: Dependencies, skin: string | Buffer, slim: boolean) =>
    dependencies.services.skinRenderer.drawModel(skin, 5, true, true, slim)

const b = await dependencies.services.skinService.getOnlineSkinForName(dependencies, 'Katonia')
await dependencies.lib.fs.writeFile(`${dependencies.config.charactersFolderPath}/skin.png`, b)
await dependencies.services.skinService.renderAndSave(dependencies, b)

// export const write

// export const update = R.curry(async (dependencies: Dependencies, id: string, character: Character) => {
//     const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
//     await db.write(
//         R.converge(
//             // @ts-ignore
//             R.adjust(R.__, R.over(R.lensProp('character'), R.mergeLeft(character))),
//             [R.findIndex(R.propEq('id', id)), R.identity]
//         )
//     )
//     const uuid = await dependencies.services.minecraftAvatarService.getUuidByUsername(dependencies, character.minecraftName)
//     await dependencies.services.minecraftAvatarService.saveAvatar(dependencies, uuid, id)
//     return id
// })

// export const remove = R.curry(async (dependencies: Dependencies, id: string) => {
//     const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
//     await db.write(
//         R.converge(
//             // @ts-ignore
//             R.remove(R.__, 1),
//             [R.findIndex(R.propEq('id', id)), R.identity]
//         )
//     )
//     return id
// })

// export const findByAccountId = R.curry(async (dependencies: Dependencies, accountId: string) => {
//     const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
//     return db(R.filter(R.whereEq({ accountId: parseInt(accountId) })))
// })

// export const get = R.curry(async (dependencies: Dependencies, id: string) => {
//     const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
//     const characters = await db(R.filter(R.whereEq({ id })))
//     return R.head(characters)
// })

// export const find = R.curry(async (dependencies: Dependencies, query: ParsedQuery) => {
//     const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
//     console.log(query)
//     return db(R.pipe(
//         /** @ts-ignore */
//         R.unless(() => R.isNil(query.filter), R.filter(R.allPass(R.map(pred => R.pathEq(R.split('.', pred[0]), pred[1]), query.filter || [])))),
//         // _filter=id=3,bla=2 - [[id.bla.test, 3], [bla, 2]]
//         R.slice(query.offset, query.offset + query.limit),
//         R.unless(() => R.isEmpty(query.properties), R.map(pickPath(query.properties)))
//     ))
// })
