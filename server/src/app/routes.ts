import type Dependencies from '../dependencies'
import type * as Koa from 'koa'
import type * as KoaRouter from '@koa/router'

export default (dependencies: ReturnType<typeof Dependencies>, app: Koa, router: KoaRouter) => {
    console.log(router.routes)
}