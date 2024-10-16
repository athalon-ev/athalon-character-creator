export default (ctx, inject) => {
    inject('api', api(ctx))
}

const api = ctx => ({
    getCharacters: async (query) => {
        const { data: characters } = await ctx.$axios.get('/characters', {
            params: {
                limit: 10,
                offset: 0,
                ...query,
            }
        })
        return characters
    },
    getAccount: async (id) => {
        const { data: account } = await ctx.$axios.get(`/accounts/${id}`)
        return account
    }
})
