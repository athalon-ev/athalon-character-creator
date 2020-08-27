import type Dependencies from '../dependencies'

export interface Skillpoint {
    value: number
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
    skillpoints: [Attribute]
}

const getFilename = (dependencies: ReturnType<typeof Dependencies>, characterName: string) => 
    dependencies.lib.path.join(dependencies.config.charactersFolderPath, characterName)

export default (dependencies: ReturnType<typeof Dependencies>) => {
    const create = async (character: Character, account: string) => {
        dependencies.lib.fs.writeJSON(getFilename(dependencies, character))
    }
    return {
        create
    }
}