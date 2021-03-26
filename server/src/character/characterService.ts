import type { Dependencies } from '../dependencies'
import type { ParsedQuery } from '../http/appTypes'
import type { Character } from '../types'
import * as R from 'ramda'

export const create = R.curry(async (dependencies: Dependencies, accountId: string, character: Character) => {
    const characterDb = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    const id = dependencies.lib.nanoid.nanoid()
    const minecraftSkin = await dependencies.services.skinService.getOnlineSkinForName(dependencies, character.minecraftName)
    const { id: skinId } = await dependencies.services.skinService.create(dependencies, {
        accountId,
        characterId: id,
        name: 'original',
        originalSkin: minecraftSkin,
    })
    await dependencies.services.databaseService.create(characterDb, {
        id,
        character: {
            ...character,
            activeSkin: skinId,
        },
        accountId,
        skins: [skinId],
    })
    return id
})

export const addSkin = R.curry(async (dependencies: Dependencies, characterId: string, accountId: string, skin: Buffer, name: string) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    const storedSkin = await dependencies.services.skinService.create(dependencies, {
        accountId,
        characterId,
        name,
        originalSkin: skin,
    })
    await dependencies.services.databaseService.update(
        db,
        characterId,
        // @ts-ignore
        R.adjust(R.__, R.over(R.lensProp('skins'), R.concat([storedSkin.id])))
    )
    return storedSkin
})

export const update = R.curry(async (dependencies: Dependencies, id: string, character: Character) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    return dependencies.services.databaseService.update(
        db,
        id,
        // only update the character property by merging
        // @ts-ignore
        R.adjust(R.__, R.over(R.lensProp('character'), R.mergeLeft(character)))
    )
})

export const remove = R.curry(async (dependencies: Dependencies, id: string) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    return dependencies.services.databaseService.removeById(db, id)
})

export const findByAccountId = R.curry(async (dependencies: Dependencies, accountId: string) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    return db(R.filter(R.whereEq({ accountId: parseInt(accountId) })))
})

export const get = R.curry(async (dependencies: Dependencies, id: string) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    return dependencies.services.databaseService.getById(db, id)
})

export const find = R.curry(async (dependencies: Dependencies, query: ParsedQuery) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    return dependencies.services.databaseService.find(db, query)
})
