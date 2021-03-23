import type { Dependencies } from '../dependencies'
import type { LowdbFpAsync } from 'lowdb'
import type { ParsedQuery } from '../app/appTypes'
import * as R from 'ramda'

import type { Character, Account, StoredCharacter, Skin } from '../types'

interface DbSchema {
    characters: StoredCharacter[]
    accounts: Account[]
    skins: Skin[]
}

const pickPath = R.curry((paths: string[], obj) =>
    R.reduce((o, p) => R.assocPath(p.split('.'), R.path(p.split('.'), obj), o), {}, paths))
export const create = R.curry(async (dependencies: Dependencies, accountId: string, character: Character) => {
    const characterDb = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    // const skinDb = await getSkinDatabase(dependencies)
    const id = dependencies.lib.nanoid.nanoid()
    const skinId = '8'
    await characterDb.write(R.concat(R.__, [{ id, character, accountId, skins: [skinId] }]))
    // const uuid = await dependencies.services.minecraftAvatarService.getUuidByUsername(dependencies, character.minecraftName)
    // await dependencies.services.minecraftAvatarService.saveAvatar(dependencies, uuid, id)
    return id
})

export const update = R.curry(async (dependencies: Dependencies, id: string, character: Character) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    await db.write(
        R.converge(
            // @ts-ignore
            R.adjust(R.__, R.over(R.lensProp('character'), R.mergeLeft(character))),
            [R.findIndex(R.propEq('id', id)), R.identity]
        )
    )
    return id
})

export const remove = R.curry(async (dependencies: Dependencies, id: string) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    await db.write(
        R.converge(
            // @ts-ignore
            R.remove(R.__, 1),
            [R.findIndex(R.propEq('id', id)), R.identity]
        )
    )
    return id
})

export const findByAccountId = R.curry(async (dependencies: Dependencies, accountId: string) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    return db(R.filter(R.whereEq({ accountId: parseInt(accountId) })))
})

export const get = R.curry(async (dependencies: Dependencies, id: string) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    const characters = await db(R.filter(R.whereEq({ id })))
    return R.head(characters)
})

export const find = R.curry(async (dependencies: Dependencies, query: ParsedQuery) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    console.log(query)
    return db(R.pipe(
        /** @ts-ignore */
        R.unless(() => R.isNil(query.filter), R.filter(R.allPass(R.map(pred => R.pathEq(R.split('.', pred[0]), pred[1]), query.filter || [])))),
        // _filter=id=3,bla=2 - [[id.bla.test, 3], [bla, 2]]
        R.slice(query.offset, query.offset + query.limit),
        R.unless(() => R.isEmpty(query.properties), R.map(pickPath(query.properties)))
    ))
})
