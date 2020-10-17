import type { Dependencies } from '../dependencies'
import type * as Koa from 'koa'
import type * as KoaRouter from '@koa/router'
import type { ParsedQuery, Query } from './appTypes'
// import * as R from 'ramda'

const parseQuery = (query: Query) => ({
    ...query,
    _limit: parseInt(query._limit || '') || 10,
    _offset: parseInt(query._offset || '') || 0,
    _properties: (query._properties || '').split(',').filter(i => i.length),
})

export default (dependencies: Dependencies, router: KoaRouter) => {
    const jwtMiddleware = dependencies.lib.KoaJWT({ secret: dependencies.config.jwtSecret })
    const allowOnlyUserOrAdminMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
        if (!(ctx.state.user.uid == ctx.state.character.accountId || ctx.state.user.gid == 4)) ctx.throw(403, 'no access')
        await next()
    }
    const characterExistsMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
        ctx.state.character = await dependencies.services.characterService.get(dependencies, ctx.params.id)
        if (!ctx.state.character) ctx.throw(404)
        await next()
    }
    const parseQueryMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
        ctx.parsedQuery = parseQuery(ctx.query)
        await next()
    }
    router.get('/', async (ctx, next) => {
    })
    router.get('/characters', parseQueryMiddleware, async ctx => {
        ctx.body = await dependencies.services.characterService.find(dependencies, ctx.parsedQuery)
    })
    router.get('/characters/:id', async ctx => {
        ctx.body = await dependencies.services.characterService.get(dependencies, ctx.params.id)
    })
    router.put('/characters/:id', jwtMiddleware, characterExistsMiddleware, allowOnlyUserOrAdminMiddleware, async ctx => {
        ctx.body = await dependencies.services.characterService.update(dependencies, ctx.params.id, ctx.request.body)
    })
    router.post('/characters', jwtMiddleware, async ctx => {
        ctx.body = await dependencies.services.characterService.create(dependencies, ctx.state.user.uid, ctx.request.body)
    })
    router.get('/characters/:id/export/mybb', async ctx => {
        // ctx.body = await dependencies.services.characterService.getCharacter(dependencies, ctx.params.accountId)
    })
    router.get('/characters/:id/export/book', async ctx => {
        // ctx.body = await dependencies.services.characterService.getCharactersByIdFromFiles(dependencies, ctx.params.id)
    })
    router.get('/accounts', async ctx => {
        ctx.body = await dependencies.services.accountService.getUsers(dependencies)
        // ctx.body = await dependencies.services.characterService.getCharactersByIdFromFiles(dependencies, ctx.params.id)
    })
    router.get('/accounts/:id/characters', async ctx => {
        ctx.body = await dependencies.services.characterService.findByAccountId(dependencies, ctx.params.id)
    })
    router.post('/accounts/login', async ctx => {
        ctx.body = await dependencies.services.accountService.login(dependencies, ctx.request.body)
        // ctx.body = await dependencies.services.characterService.getCharacter(dependencies, ctx.params.accountId)
    })
}