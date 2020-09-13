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
    }
}
