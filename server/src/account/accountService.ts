import type { Dependencies } from '../dependencies'
import * as R from 'ramda'

const addApiKey = (dependencies: Dependencies, path: string) => `${path}?apikey=${dependencies.config.forumApiKey}`

export const login = R.curry(async (dependencies: Dependencies, username: String, password: String) => {
    const { data: result } = await dependencies.config.forumClient.post(addApiKey(dependencies, 'api.php'), {
        username,
        password
    })
    return result == 'ok'
})

const userArrayToObject = ([uid, username]: any) => ({ uid, username })

export const getUsers = R.curry(async (dependencies: Dependencies) => {
    const { data } = await dependencies.config.forumClient.get(addApiKey(dependencies, 'users.php'))
    return R.map(userArrayToObject, data)
})