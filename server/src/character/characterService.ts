import type { Dependencies } from '../dependencies'
import type { ParsedQuery } from '../http/appTypes'
import type { Character } from '../types'
import * as R from 'ramda'

export const create = async (dependencies: Dependencies, accountId: string, character: Character) => {
    const characterDb = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    const id = dependencies.lib.nanoid.nanoid()
    const minecraftSkin = await dependencies.services.skinService.getOnlineSkinForName(dependencies, character.minecraftName || 'Eragh')
    const { id: skinId } = await dependencies.services.skinService.create(dependencies, {
        accountId,
        characterId: id,
        name: 'original',
        originalSkin: minecraftSkin,
    })
    await dependencies.services.databaseService.create(characterDb, {
        id,
        created: new Date(),
        updated: new Date(),
        character: {
            ...character,
            activeSkin: skinId,
        },
        accountId,
    })
    return id
}

export const addSkin = async (dependencies: Dependencies, characterId: string, accountId: string, skin: Buffer, name: string) => {
    const storedSkin = await dependencies.services.skinService.create(dependencies, {
        accountId,
        characterId,
        name,
        originalSkin: skin,
    })
    return storedSkin
}

export const update = async (dependencies: Dependencies, id: string, character: Character) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    return dependencies.services.databaseService.update(
        db,
        id,
        // only update the character property by merging
        R.over(R.lensProp('character'), R.mergeLeft(character))
    )
}

export const remove = async (dependencies: Dependencies, id: string) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    return dependencies.services.databaseService.removeById(db, id)
}

export const findByAccountId = async (dependencies: Dependencies, accountId: string) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    return db(R.filter(R.whereEq({ accountId: parseInt(accountId) })))
}

export const get = async (dependencies: Dependencies, id: string) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    return dependencies.services.databaseService.getById(db, id)
}

export const find = async (dependencies: Dependencies, query: ParsedQuery) => {
    const db = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    return dependencies.services.databaseService.find(db, query)
}
