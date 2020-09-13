import type { Dependencies } from '../dependencies'
import type { LowdbFpAsync } from 'lowdb'
import type { ParsedQuery } from '../app/appTypes'
import * as R from 'ramda'

import type { AccountIdentifier, Character, Account, StoredCharacter } from './characterTypes'

interface DbSchema {
    characters: StoredCharacter[]
    accounts: Account[]
}

const pickPath = R.curry((paths: string[], obj) => 
    R.reduce((o, p) => R.assocPath(p.split('.'), R.path(p.split('.'), obj), o), {}, paths))

const getCharacterDatabase = async (dependencies: Dependencies) =>
    (await dependencies.services.databaseService.getDb(dependencies, dependencies.config.charactersDatabasePath) as LowdbFpAsync<DbSchema>)
    ('characters', [])

export const create = R.curry(async (dependencies: Dependencies, accountId: AccountIdentifier, character: Character) => {
    const db = await getCharacterDatabase(dependencies)
    await db.write(R.concat(R.__, [{ id: dependencies.lib.nanoid.nanoid(), character, accountId }]))
})

export const update = R.curry(async (dependencies: Dependencies, id: string, character: Character) => {
    const db = await getCharacterDatabase(dependencies)
    await db.write(
        R.converge(
            // @ts-ignore
            R.adjust(R.__, R.over(R.lensProp('character'), R.mergeLeft(character))),
            [R.findIndex(R.propEq('id', id)), R.identity]
        )
    )
})

export const findByAccountId = R.curry(async (dependencies: Dependencies, accountId: string) => {
    const db = await getCharacterDatabase(dependencies)
    return db(R.filter(R.whereEq({ accountId: parseInt(accountId) })))
})

export const get = R.curry(async (dependencies: Dependencies, id: string) => {
    const db = await getCharacterDatabase(dependencies)
    const characters = await db(R.filter(R.whereEq({ id })))
    return R.head(characters)
})

export const find = R.curry(async (dependencies: Dependencies, query: ParsedQuery) => {
    const db = await getCharacterDatabase(dependencies)
    return db(R.pipe(
        R.slice(query._offset, query._offset + query._limit),
        R.unless(() => R.isEmpty(query._properties), R.map(pickPath(query._properties)))
    ))
})
