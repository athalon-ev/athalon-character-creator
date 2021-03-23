import * as R from 'ramda'
import type { LowdbFpAsync } from 'lowdb'
import type { Dependencies } from '../dependencies'
import type { StoredCharacter, Skin } from '../types'

export const getDb = R.curry(async (dependencies: Dependencies, filepath: string) =>
    dependencies.lib.lowdb(new dependencies.lib.LowDbFileAsyncAdapter(filepath))
)

interface DbSchema {
    characters: StoredCharacter[]
    skins: Skin[]
}

export const getCharacterDatabase = async (dependencies: Dependencies) =>
    (await dependencies.services.databaseService.getDb(dependencies, dependencies.config.charactersDatabasePath) as LowdbFpAsync<DbSchema>)('characters', [])

export const getSkinDatabase = async (dependencies: Dependencies) =>
    (await dependencies.services.databaseService.getDb(dependencies, dependencies.config.charactersDatabasePath) as LowdbFpAsync<DbSchema>)('skins', [])