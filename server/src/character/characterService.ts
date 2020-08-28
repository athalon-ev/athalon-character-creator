import type Dependencies from '../dependencies'
import * as R from 'ramda'

export interface Skillpoint {
    name: string
    basePoints: number
    points: number
    custom: boolean
    categories: []
    category: Skillpoint
    deletable: boolean
    linkAttribute: boolean
    hidden: boolean
}

export interface Attribute {
    name: string
    colorForum: string
    colorCreator: string
    attribute: number,
    skills: [Skillpoint]
}

export interface Character {
    name: string
    minecraftName: string
    gender: string
    age: number
    size: number
    weight: string
    haircolor: string
    eyecolor: string
    nationality: string
    birthcity: string
    physical: string
    habits: string
    ideology: string
    fears: string
    job: string
    family: string
    whyLeft: string
    leftWhat: string
    goals: string
    skillpoints: { [key: string]: Skillpoint[] }
}

export const getFilename = R.curry((dependencies: ReturnType<typeof Dependencies>, characterName: string) => 
    dependencies.lib.path.join(
        dependencies.config.charactersFolderPath,
        dependencies.lib.filenamify(characterName)
    )
)
export const create = R.curry(async (dependencies: ReturnType<typeof Dependencies>, character: Character, account: string) => {
    dependencies.lib.fs.writeJSON(getFilename(dependencies, character.name), {})
})

export default (dependencies: ReturnType<typeof Dependencies>) => {
    return {
        create: create(dependencies),
        getFilename: getFilename(dependencies),
    }
}