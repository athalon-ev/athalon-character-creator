import type { Dependencies } from '../dependencies'
import type * as KoaRouter from '@koa/router'

export default (dependencies: Dependencies, router: KoaRouter) => {
    const middlewares = dependencies.config.server.routeMiddlewares
    router.get('/skins', middlewares.parseQueryMiddleware(), async ctx => {
        // ctx.body = await dependencies.services.skinService.find(dependencies, ctx.parsedQuery)
    })
    router.get('/', async (ctx, next) => {
    })
    router.get('/characters', middlewares.parseQueryMiddleware(), async ctx => {
        ctx.body = await dependencies.services.characterService.find(dependencies, ctx.parsedQuery)
    })
    router.get('/characters/:id', async ctx => {
        ctx.body = await dependencies.services.characterService.get(dependencies, ctx.params.id)
    })
    router.put(
        '/characters/:id',
        middlewares.jwtMiddleware(dependencies),
        middlewares.characterExistsMiddleware(dependencies),
        middlewares.allowOnlyUserOrAdminMiddleware(dependencies),
        async ctx => {
            ctx.body = await dependencies.services.characterService.update(dependencies, ctx.params.id, ctx.request.body)
        }
    )
    router.del(
        '/characters/:id',
        middlewares.jwtMiddleware(dependencies),
        middlewares.characterExistsMiddleware(dependencies),
        middlewares.allowOnlyUserOrAdminMiddleware(dependencies),
        async ctx => {
            ctx.body = await dependencies.services.characterService.remove(dependencies, ctx.params.id)
        }
    )
    router.post(
        '/characters',
        middlewares.jwtMiddleware(dependencies),
        async ctx => {
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
    })
    router.get('/accounts/:id', async ctx => {
        ctx.body = await dependencies.services.accountService.getUser(dependencies, ctx.params.id)
    })
    router.get('/accounts/:id/characters', async ctx => {
        ctx.body = await dependencies.services.characterService.findByAccountId(dependencies, ctx.params.id)
    })
    router.post('/accounts/login', async ctx => {
        ctx.body = await dependencies.services.accountService.login(dependencies, ctx.request.body)
    })
}