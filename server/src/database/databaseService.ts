import * as R from 'ramda'
import type { Dependencies } from '../dependencies'
import { lowdb } from 'lowdb'

export const db = R.curry(async (dependencies: Dependencies, filepath: string) =>
    dependencies.lib.lowdb(new dependencies.lib.LowDbFileAsyncAdapter(filepath))
)

const write = R.curry(async (dependencies: Dependencies, database: any) => {
    const x = await db(dependencies, 'd.js')
    x.write(R.concat([]))
    // x.write(R.concat([]))
})

const characters = db('characters')
// @ts-ignore
const x = await characters.write(R.concat([{b: 3}]))
const cs = await characters(R.identity)
console.log(cs)
// const posts = await db.defaults({ characters: [], accounts: [] }).write()
// db.find