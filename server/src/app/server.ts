import * as R from 'ramda'
import type { Dependencies } from '../dependencies'
import type Routes from './routes'
import type * as Koa from 'koa'

// @ts-ignore
const useMiddleware = dependencies => app => R.pipe(
    // @ts-ignore
    R.applyTo(dependencies),
    middleware => app.use(middleware)
)
const useMiddlewares = (dependencies: Dependencies) => 
    (app: Koa) =>
        R.map(useMiddleware(dependencies)(app))

export default (dependencies: Dependencies, routes: typeof Routes) => {
    const { lib: { Koa, KoaRouter, console }, config, server } = dependencies
    const app = new Koa()
    // @ts-ignore
    useMiddlewares(dependencies)(app)(server.middlewares)
    app.use(async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            ctx.status = err.status || 500
            ctx.body = {
                message: err.message,
                status: ctx.status,
            }
            ctx.app.emit('error', err, ctx)
        }
    })
    app.on('error', err => {
        err.expose = true
        if (err.response) err.message = err.response.data
        console.error(err)
    })
    app.use(dependencies.lib.KoaStatic({
        rootDir: dependencies.config.charactersFolderPath,
        rootPath: '/images'
    }))

    const router = new KoaRouter({ prefix: config.server.pathPrefix })
    routes(dependencies, router)
    app.use(router.routes())
    return app.listen(
        config.server.port, 
        config.server.host,
        () => console.log(`Server listening on ${config.server.host}:${config.server.port}${config.server.pathPrefix}`))
}
