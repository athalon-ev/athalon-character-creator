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

const getCharactersByAccountId = (files: string[], id: AccountIdentifier) => R.pipe(
    R.map(parseCharacterFilename),
    R.filter(R.propSatisfies(x => x == id, 'id')),
)(files)

const readFileWithPath = R.curry(async (dependencies: Dependencies, filename: string) => {
    const file = await dependencies.lib.fs.readJSON(filename)
    return { ...file, ...parseCharacterFilename(dependencies.lib.path.basename(filename)) }
})

const readCharacterFiles = (dependencies: Dependencies, files: string[]) =>
    Promise.all(
        R.map(
            readCharacterFile(dependencies),
            files
        ) as (StoredCharacter & ReturnType<typeof parseCharacterFilename>)[]
    )

const readCharacterFile = R.curry((dependencies: Dependencies, filename: string): Promise<StoredCharacter & ReturnType<typeof parseCharacterFilename>> =>
    readFileWithPath(dependencies, dependencies.lib.path.join(dependencies.config.charactersFolderPath, filename))
)

const getFilename = R.curry((dependencies: Dependencies, storedAccount: StoredCharacter) => 
    dependencies.lib.path.join(
        dependencies.config.charactersFolderPath,
        dependencies.lib.filenamify(`${storedAccount.account.id}${filenameSeperator}${storedAccount.character.name}`)
    )
)

export const getCharactersByAccountIdFromFiles = R.curry(async (dependencies: Dependencies, id: AccountIdentifier) => {
    const files = await getCharacterFiles(dependencies)
    const names = getCharactersByAccountId(files, id)
    return readCharacterFiles(dependencies, R.map(R.prop('filename'), names))
})

export const getCharacter = R.curry(async (dependencies: Dependencies, id: AccountIdentifier, characterName: string) =>
    readCharacterFile(dependencies, dependencies.lib.filenamify(`${id}${filenameSeperator}${characterName}`))
)

export const create = R.curry(async (dependencies: Dependencies, character: Character, account: Account) => 
    dependencies.lib.fs.writeJSON(getFilename(dependencies, { account, character }), character)
)

export const remove = R.curry(async (dependencies: Dependencies, character: Character, account: Account) => 
    dependencies.lib.fs.remove(getFilename(dependencies, { account, character }))
)