import type { Dependencies } from '../dependencies'
import type * as Koa from 'koa'
import type * as KoaRouter from '@koa/router'

export default (dependencies: Dependencies, app: Koa, router: KoaRouter) => {
    router.get('/', async (ctx, next) => {
    })
    router.get('/characters/:accountId', async ctx => {
        ctx.body = await dependencies.services.characterService.getCharactersByAccountIdFromFiles(dependencies, ctx.params.accountId)
    })
    router.get('/characters/:accountId/:characterName', async ctx => {
        ctx.body = await dependencies.services.characterService.getCharacter(dependencies, ctx.params.accountId, ctx.params.characterName)
    })
    router.get('/characters/:accountId/:characterName/export/mybb', async ctx => {
        ctx.body = await dependencies.services.characterService.getCharacter(dependencies, ctx.params.accountId)
    })
    router.get('/characters/:accountId/:characterName/export/book', async ctx => {
        // ctx.body = await dependencies.services.characterService.getCharactersByIdFromFiles(dependencies, ctx.params.id)
    })
}