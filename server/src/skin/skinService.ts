import type { Dependencies } from '../dependencies'
import * as R from 'ramda'

// import type { Skin } from '../types'

export const create = R.curry(async (dependencies: Dependencies, name: string, accountId: string, characterId: string) => {
    const skinDb = await dependencies.services.databaseService.getSkinDatabase(dependencies)
    const id = dependencies.lib.nanoid.nanoid()
    await skinDb.write(R.concat(R.__, [{ id, name, accountId, characterId, renderedSkinpath, originalSkinpath }]))
    return id
})

export const syncSkinForName = async (dependencies: Dependencies, minecraftName: string, path: string) => {
    const uuid = await dependencies.services.minecraftApi.getUUIDForName(dependencies, minecraftName)
    const skin = await dependencies.services.minecraftApi.getSkinBuffer(dependencies, uuid)
    return dependencies.lib.fs.writeFile(path, skin)
}

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
