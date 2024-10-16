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

export const login = async (dependencies: Dependencies, credentials: LoginCredentials) => {
    const forumUser = await loginWithForumAccount(dependencies, credentials)
    return {
        token: dependencies.lib.jwt.sign(R.pick(['gid', 'uid'], forumUser), dependencies.config.jwtSecret),
        ...forumUser,
    }
}

const register = () => {
//     fetch("https://board.athalon.de/member.php", {
//   "headers": {
//     "content-type": "application/x-www-form-urlencoded",
//   },
//   "body": "regcheck1=&regcheck2=true&username=TestAccountBitteLoeschen3&password=asdasdasd&password2=asdasdasd&email=martin%2B232%40happy-css.com&email2=martin%2B232%40happy-css.com&referrername=&answer=fantastisches+rollenspiel&question_id=Y7FgQomQ4d6IQczo7cLLy4hpzNceOKOi&allownotices=1&receivepms=1&pmnotice=1&subscriptionmethod=0&timezoneoffset=1&dstcorrection=2&language=&regtime=1664274405&step=registration&action=do_register&regsubmit=Registrierung+best%C3%A4tigen%21",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });
}

export const loginWithForumAccount = async (dependencies: Dependencies, credentials: LoginCredentials): Promise<ForumUser> => {
    const { data: result } = await dependencies.config.forumClient.post(addApiKey(dependencies, 'api.php'), credentials)
    return result
}

export const getUsers = async (dependencies: Dependencies) => {
    const { data } = await dependencies.config.forumClient.get(addApiKey(dependencies, 'users.php'))
    return data
}

export const getUser = async (dependencies: Dependencies, id: number) => {
    const users = await getUsers(dependencies)
    return R.find(R.propEq('uid', id), users)
}

export const getGroups = async (dependencies: Dependencies) => {
    const { data } = await dependencies.config.forumClient.get(addApiKey(dependencies, 'groups.php'))
    return data
}