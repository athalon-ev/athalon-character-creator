import type { Dependencies } from '../dependencies'
import * as R from 'ramda'

import type { AccountIdentifier, Character, Account, StoredCharacter } from './characterTypes'

const filenameSeperator = '---'

const getCharacterFiles = R.curry(async (dependencies: Dependencies) => 
    dependencies.lib.fs.readdir(dependencies.config.charactersFolderPath)
)

const parseCharacterFilename = R.pipe(
    R.split(filenameSeperator),
    arr => ({ id: arr[0], characterName: arr[1], filename: `${arr[0]}${filenameSeperator}${arr[1]}` })
)

const getCharactersById = (files: string[], id: AccountIdentifier) => R.pipe(
    R.map(parseCharacterFilename),
    R.filter(R.propSatisfies(x => x == id, 'id')),
)(files)

const readCharacterFiles = (dependencies: Dependencies, files: string[]) =>
    Promise.all(
        R.map(
            dependencies.lib.fs.readJSON,
            R.map(
                f => dependencies.lib.path.join(dependencies.config.charactersFolderPath, f),
                files
            )
        ) as unknown as Character[]
    )

const getFilename = R.curry((dependencies: Dependencies, storedAccount: StoredCharacter) => 
    dependencies.lib.path.join(
        dependencies.config.charactersFolderPath,
        dependencies.lib.filenamify(`${storedAccount.account.id}${filenameSeperator}${storedAccount.character.name}`)
    )
)

export const getCharactersByIdFromFiles = R.curry(async (dependencies: Dependencies, id: AccountIdentifier): Promise<Character[]> => {
    const files = await getCharacterFiles(dependencies)
    const names = getCharactersById(files, id)
    return readCharacterFiles(dependencies, R.map(R.prop('filename'), names))
})

export const create = R.curry(async (dependencies: Dependencies, character: Character, account: Account) => {
    dependencies.lib.fs.writeJSON(getFilename(dependencies, { account, character }), character)
})

export const remove = R.curry(async (dependencies: Dependencies, character: Character, account: Account) => {
    dependencies.lib.fs.remove(getFilename(dependencies, { account, character }))
})