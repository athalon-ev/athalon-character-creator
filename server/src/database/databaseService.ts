import * as R from 'ramda'
import type { Dependencies } from '../dependencies'

export const getDb = R.curry(async (dependencies: Dependencies, filepath: string) =>
    dependencies.lib.lowdb(new dependencies.lib.LowDbFileAsyncAdapter(filepath))
)