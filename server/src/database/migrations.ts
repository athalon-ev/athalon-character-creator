import type { Dependencies } from '../dependencies'
import * as R from 'ramda'

export const addTimestampsForCreationAndUpdateAndSkin = async (dependencies: Dependencies) => {
    const chracterDb = await dependencies.services.databaseService.getCharacterDatabase(dependencies)
    const characters = await chracterDb(R.identity)
    const migrated = await Promise.all(characters.map(async character => {
        const minecraftSkin = await dependencies.services.skinService.getOnlineSkinForName(dependencies, character.character.minecraftName)
        const { id: skinId } = await dependencies.services.skinService.create(dependencies, {
            accountId: character.accountId,
            characterId: character.id,
            name: 'Original',
            originalSkin: minecraftSkin,
        })
        return {
            ...character,
            created: new Date(),
            updated: new Date(),
            character: {
                ...character.character,
                activeSkin: skinId
            },
        }
    }))
    await chracterDb.write(() => migrated)
}

export const run = (dependencies: Dependencies) => {
    addTimestampsForCreationAndUpdateAndSkin(dependencies)
}
