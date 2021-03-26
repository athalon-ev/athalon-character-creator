import * as R from 'ramda'
import type { Dependencies } from '../dependencies'
import type { SkinDTO } from '../types'
import type { ParsedQuery } from '../http/appTypes'

export const create = async (dependencies: Dependencies, skin: SkinDTO) => {
    const db = await dependencies.services.databaseService.getSkinDatabase(dependencies)
    const id = dependencies.lib.nanoid.nanoid()
    const paths = await renderAndStoreSkin(dependencies, skin.originalSkin, id)
    const saveSkin = {
        ...R.omit(['originalSkin'], skin),
        ...paths,
        id,
    }
    await dependencies.services.databaseService.create(db, saveSkin)
    return saveSkin
}

export const update = R.curry(async (dependencies: Dependencies, id: string, skin: Partial<SkinDTO>) => {
    const db = await dependencies.services.databaseService.getSkinDatabase(dependencies)
    const paths = skin.originalSkin ? await renderAndStoreSkin(dependencies, skin.originalSkin, id) : {}
    return dependencies.services.databaseService.update(
        db,
        id,
        // @ts-ignore
        R.mergeLeft({
            ...R.omit(['originalSkin'], skin),
            paths,
        })
    )
})

export const remove = R.curry(async (dependencies: Dependencies, id: string) => {
    const db = await dependencies.services.databaseService.getSkinDatabase(dependencies)
    return dependencies.services.databaseService.removeById(db, id)
})

export const renderAndStoreSkin = async (dependencies: Dependencies, skin: Buffer, id: string) => {
    const renderedSkin = await dependencies.services.skinRenderer.drawModel(skin, 5, true, true, false)
    const originalSkinPath = `${id}-original.png`
    const renderedSkinPath = `${id}-3d.png`
    await dependencies.lib.fs.writeFile(`${dependencies.config.charactersFolderPath}/${originalSkinPath}`, skin)
    await dependencies.lib.fs.writeFile(`${dependencies.config.charactersFolderPath}/${renderedSkinPath}`, renderedSkin)
    return {
        originalSkinPath,
        renderedSkinPath,
    }
}

export const getOnlineSkinForName = async (dependencies: Dependencies, minecraftName: string) => {
    const uuid = await dependencies.services.minecraftApi.getUUIDForName(dependencies, minecraftName)
    return dependencies.services.minecraftApi.getSkinBuffer(dependencies, uuid)
}

export const render = async (dependencies: Dependencies, skin: string | Buffer, slim: boolean) =>
    dependencies.services.skinRenderer.drawModel(skin, 5, true, true, slim)

export const findByAccountId = R.curry(async (dependencies: Dependencies, accountId: string) => {
    const db = await dependencies.services.databaseService.getSkinDatabase(dependencies)
    return db(R.filter(R.whereEq({ accountId: parseInt(accountId) })))
})

export const get = R.curry(async (dependencies: Dependencies, id: string) => {
    const db = await dependencies.services.databaseService.getSkinDatabase(dependencies)
    return dependencies.services.databaseService.getById(db, id)
})

export const find = R.curry(async (dependencies: Dependencies, query: ParsedQuery) => {
    const db = await dependencies.services.databaseService.getSkinDatabase(dependencies)
    return dependencies.services.databaseService.find(db, query)
})
