import type { Dependencies } from '../dependencies'
import * as R from 'ramda'

export interface LoginCredentials {
    username: string
    password: string
    token?: string
}

export interface ForumUser {
    uid: string
    username: string
    email: string
    postnum: string
    threadnum: string
    avatar: string
    avatardimensions: string
    avatartype: string
    usergroup: string
    regdate: string
    lastactive: string
    lastvisit: string
    lastpost: string
    gid: string
    type: string
    title: string
    description: string
    namestyle: string
}

const addApiKey = (dependencies: Dependencies, path: string) => `${path}?apikey=${dependencies.config.forumApiKey}`

export const login = R.curry(async (dependencies: Dependencies, credentials: LoginCredentials) => {
    const forumUser = await loginWithForumAccount(dependencies, credentials)
    return {
        token: dependencies.lib.jwt.sign(R.pick(['gid', 'uid'], forumUser), dependencies.config.jwtSecret),
        ...forumUser,
    }
})

export const loginWithForumAccount = R.curry(async (dependencies: Dependencies, credentials: LoginCredentials): Promise<ForumUser> => {
    const { data: result } = await dependencies.config.forumClient.post(addApiKey(dependencies, 'api.php'), credentials)
    return result
})

export const getUsers = R.curry(async (dependencies: Dependencies) => {
    const { data } = await dependencies.config.forumClient.get(addApiKey(dependencies, 'users.php'))
    return data
})

export const getUser = R.curry(async (dependencies: Dependencies, id: number) => {
    const users = await getUsers(dependencies)
    return R.find(R.propEq('uid', id), users)
})

export const getGroups = R.curry(async (dependencies: Dependencies) => {
    const { data } = await dependencies.config.forumClient.get(addApiKey(dependencies, 'groups.php'))
    return data
})