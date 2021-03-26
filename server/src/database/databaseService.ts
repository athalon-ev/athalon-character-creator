import * as R from 'ramda'
import type { LowdbFpAsync, FpReturnAsync } from 'lowdb'
import type { Dependencies } from '../dependencies'
import type { StoredCharacter, StoredSkin } from '../types'
import type { ParsedQuery } from '../http/appTypes'

export const getDb = R.curry(async (dependencies: Dependencies, filepath: string) =>
    dependencies.lib.lowdb(new dependencies.lib.LowDbFileAsyncAdapter(filepath))
)

interface DbSchema {
    characters: StoredCharacter[]
    skins: StoredSkin[]
}

interface Identifibable {
    id: string
}

const pickPath = R.curry((paths: string[], obj) =>
    R.reduce((o, p) => R.assocPath(p.split('.'), R.path(p.split('.'), obj), o), {}, paths))

export const getCharacterDatabase = async (dependencies: Dependencies) =>
    (await dependencies.services.databaseService.getDb(dependencies, dependencies.config.charactersDatabasePath) as LowdbFpAsync<DbSchema>)('characters', [])

export const getSkinDatabase = async (dependencies: Dependencies) =>
    (await dependencies.services.databaseService.getDb(dependencies, dependencies.config.skinsDatabasePath) as LowdbFpAsync<DbSchema>)('skins', [])

export const getById = async <T extends Identifibable>(db: FpReturnAsync<T[]>, id: string) =>
    db(R.find(R.whereEq({ id })))

export const create = async <T extends Identifibable>(db: FpReturnAsync<T[]>, item: T) =>
    db.write(R.concat(R.__, [item]))

export const find = async <T extends Identifibable>(db: FpReturnAsync<T[]>, query: ParsedQuery) => {
    return db(R.pipe(
        /** @ts-ignore */
        R.unless(() => R.isNil(query.filter), R.filter(R.allPass(R.map(pred => R.pathEq(R.split('.', pred[0]), pred[1]), query.filter || [])))),
        // _filter=id=3,bla=2 - [[id.bla.test, 3], [bla, 2]]
        R.slice(query.offset, query.offset + query.limit),
        R.unless(() => R.isEmpty(query.properties), R.map(pickPath(query.properties)))
    ))
}

export const removeById = async <T extends Identifibable>(db: FpReturnAsync<T[]>, id: string) => {
    await db.write(
        R.converge(
            // @ts-ignore
            R.remove(R.__, 1),
            [R.findIndex(R.propEq('id', id)), R.identity]
        )
    )
    return id
}

export const update = async <T extends Identifibable>(db: FpReturnAsync<T[]>, id: string, updateFn: (item: T) => any) => {
    await db.write(
        R.converge(
            updateFn,
            [R.findIndex(R.propEq('id', id)), R.identity]
        )
    )
    return id
}
