import type { Dependencies } from '../dependencies'
import type * as Koa from 'koa'
import type * as KoaRouter from '@koa/router'
import jwt = require('koa-jwt')

export default (dependencies: Dependencies, app: Koa, router: KoaRouter) => {
    const jwtMiddleware = dependencies.lib.KoaJWT({ secret: dependencies.config.jwtSecret })
    const allowOnlyUserOrAdmin = async (ctx: Koa.Context, next: Koa.Next) => {
        console.log(ctx.state.user.uid, ctx.params)
        if (!(ctx.state.user.uid == ctx.params.accountId || ctx.state.user.gid == 4)) ctx.throw(403, 'no access')
        await next()
    }
    router.get('/', async (ctx, next) => {
    })
    router.get('/characters/:accountId', async ctx => {
        ctx.body = await dependencies.services.characterService.getCharactersByAccountIdFromFiles(dependencies, ctx.params.accountId)
    })
    router.get('/characters/:accountId/:characterName', async ctx => {
        ctx.body = await dependencies.services.characterService.getCharacter(dependencies, ctx.params.accountId, ctx.params.characterName)
    })
    router.put('/characters/:accountId/:characterName', jwtMiddleware, allowOnlyUserOrAdmin, async ctx => {
        ctx.body = await dependencies.services.characterService.getCharacter(dependencies, ctx.params.accountId, ctx.params.characterName)
    })
    router.post('/characters', jwtMiddleware, async ctx => {
        await dependencies.services.characterService.create(dependencies, ctx.state.user.uid, ctx.request.body)
        ctx.status = 201
    })
    router.get('/characters/:accountId/:characterName/export/mybb', async ctx => {
        // ctx.body = await dependencies.services.characterService.getCharacter(dependencies, ctx.params.accountId)
    })
    router.get('/characters/:accountId/:characterName/export/book', async ctx => {
        // ctx.body = await dependencies.services.characterService.getCharactersByIdFromFiles(dependencies, ctx.params.id)
    })
    router.get('/users', async ctx => {
        ctx.body = await dependencies.services.accountService.getUsers(dependencies)
        // ctx.body = await dependencies.services.characterService.getCharactersByIdFromFiles(dependencies, ctx.params.id)
    })
    router.post('/account/login', async ctx => {
        ctx.body = await dependencies.services.accountService.login(dependencies, ctx.request.body)
        // ctx.body = await dependencies.services.characterService.getCharacter(dependencies, ctx.params.accountId)
    })
}