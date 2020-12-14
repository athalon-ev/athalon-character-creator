export default (ctx, inject) => {
    inject('api', api(ctx))
}

const api = ctx => ({
    getCharacters: async ({ limit = 10, offset = 0 }) => {
        const { data: characters } = await ctx.$axios.get('/characters', {
            params: {
                _limit: limit,
                _offset: offset,
            }
        })
        return characters
    }
})
