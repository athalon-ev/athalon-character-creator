import * as R from 'ramda'
import type Dependencies from '../dependencies'
import type Routes from './routes'
import type * as Koa from 'koa'

// @ts-ignore
const useMiddleware = dependencies => app => R.pipe(
    // @ts-ignore
    R.applyTo(dependencies),
    middleware => app.use(middleware)
)
const useMiddlewares = (dependencies: ReturnType<typeof Dependencies>) => 
    (app: Koa) =>
        R.map(useMiddleware(dependencies)(app))

const chainErrorMessages = R.pipe(
    // @ts-ignore
    R.chain(R.prop('messages')),
    // @ts-ignore
    R.chain(R.prop('message')),
    R.join(',')
)

export default (dependencies: ReturnType<typeof Dependencies>, routes: typeof Routes) => {
    const { lib: { Koa, KoaRouter, console }, config, server } = dependencies
    const app = new Koa()
    // @ts-ignore
    useMiddlewares(dependencies)(app)(server.middlewares)
    app.on('error', err => {
        err.expose = true
        // @ts-ignore
        if (err.response && err.response.data) err.message = chainErrorMessages(err.response.data.message)
        console.error(err)
    })

    const router = new KoaRouter({ prefix: config.server.pathPrefix })
    routes(dependencies, app, router)
    app.use(router.routes())
    return app.listen(
        config.server.port, 
        config.server.host,
        () => console.log(`Server listening on ${config.server.host}:${config.server.port}${config.server.pathPrefix}`))
}
