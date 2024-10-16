import cookieparser from 'cookieparser'

export const state = () => ({
    user: null
})

export const mutations = {
    setUser(state, user) {
        state.user = user
    }
}

export const actions = {
    login(state, user) {
        state.user = user
    },
    nuxtServerInit({ commit }, { req }) {
        let user = null
        if (req && req.headers && req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            user = (parsed.user && JSON.parse(parsed.user)) || null
        }
        console.log(user)

        commit('setUser', user)
    }
}
