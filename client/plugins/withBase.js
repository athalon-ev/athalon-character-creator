export default (ctx, inject) => {
    inject('withBase', withBase(ctx))
}

const withBase = ctx => file => ctx.$config.axios.baseURL + file
