import * as R from 'ramda'
import type { Dependencies } from '../dependencies'
import type * as Koa from 'koa'
import type { Query } from './appTypes'

const parseFilterValue = (value: string) => {
    if (value == 'true') return true
    if (value == 'false') return false
    return value
}

const parseFilter = R.pipe(
    R.split(','),
    R.map(R.pipe(
        R.split('='),
        R.over(R.lensProp('1'), parseFilterValue)
    )),
)

const parseQuery = (query: Query) => ({
    ...query,
    limit: query.limit == '0' ? Infinity : parseInt(query.limit || '') || 10,
    offset: parseInt(query.offset || '') || 0,
    properties: (query.properties || '').split(',').filter(i => i.length),
    filter: query.filter ? parseFilter(query.filter) : null
})

export const jwtMiddleware = (dependencies: Dependencies) => dependencies.lib.KoaJWT({ secret: dependencies.config.jwtSecret })
export const allowOnlyUserOrAdminMiddleware = (dependencies: Dependencies) => async (ctx: Koa.Context, next: Koa.Next) => {
    if (!(
        ctx.state.user.uid == ctx.state.character.accountId ||
        dependencies.config.adminGroupIds.includes(parseInt(ctx.state.user.gid)))
    ) ctx.throw(403, 'no access')
    await next()
}
export const characterExistsMiddleware = (dependencies: Dependencies) => async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.state.character = await dependencies.services.characterService.get(dependencies, ctx.params.id)
    if (!ctx.state.character) ctx.throw(404)
    await next()
}
export const parseQueryMiddleware = () => async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.parsedQuery = parseQuery(ctx.query)
    await next()
}