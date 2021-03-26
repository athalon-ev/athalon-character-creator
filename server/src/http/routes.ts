import type { Dependencies } from '../dependencies'
import type * as KoaRouter from '@koa/router'
import type { File } from 'formidable'

export default (dependencies: Dependencies, router: KoaRouter) => {
    const middlewares = dependencies.config.server.routeMiddlewares
    const body = dependencies.config.server.globalMiddlewares.KoaBody
    router.get('/skins', middlewares.parseQueryMiddleware(), async ctx => {
        ctx.body = await dependencies.services.skinService.find(dependencies, ctx.parsedQuery)
    })
    router.get('/skins/:id', middlewares.parseQueryMiddleware(), async ctx => {
        ctx.body = await dependencies.services.skinService.get(dependencies, ctx.params.id)
    })
    router.get('/', async (ctx, next) => {
    })
    router.get('/characters', middlewares.parseQueryMiddleware(), async ctx => {
        ctx.body = await dependencies.services.characterService.find(dependencies, ctx.parsedQuery)
    })
    router.get('/characters/:id', async ctx => {
        ctx.body = await dependencies.services.characterService.get(dependencies, ctx.params.id)
    })
    router.get('/characters/:id/skins', middlewares.parseQueryMiddleware(), async ctx => {
        ctx.body = await dependencies.services.skinService.find(dependencies, { ...ctx.parsedQuery, filter: [...ctx.parsedQuery.filter || [], ['characterId', ctx.params.id]] })
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
        }
    )
    router.post(
        '/characters/:id/skins',
        middlewares.jwtMiddleware(dependencies),
        middlewares.characterExistsMiddleware(dependencies),
        middlewares.allowOnlyUserOrAdminMiddleware(dependencies),
        body({
            multipart: true,
            formidable: {
                multiples: false,
            }
        }),
        async ctx => {
            if (!ctx.request.files || !ctx.request.files.skin) ctx.throw(400, 'No skin was uploaded')
            const skinFile = ctx.request.files?.skin as unknown as File
            const skin = await dependencies.lib.fs.readFile(skinFile.path)
            ctx.body = await dependencies.services.characterService.addSkin(
                dependencies,
                ctx.params.id,
                ctx.state.user.uid,
                skin,
                ctx.request.body.name
            )
        }
    )
    router.put(
        '/characters/:id/skins/:skinId',
        middlewares.jwtMiddleware(dependencies),
        middlewares.characterExistsMiddleware(dependencies),
        middlewares.allowOnlyUserOrAdminMiddleware(dependencies),
        async ctx => {
            const skinFile = ctx.request.files?.skin as unknown as File
            const skin = skinFile && await dependencies.lib.fs.readFile(skinFile.path)
            ctx.body = await dependencies.services.skinService.update(dependencies, ctx.params.skinId, {
                name: ctx.request.body.name,
                ...(skin ? { originalSkin: skin } : {}),
            })
        }
    )
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