export interface Skillpoint {
    name: string
    basePoints: number
    points: number
    custom: boolean
    categories: Skillpoint[]
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
    skills: Skillpoint[]
}

export interface Character {
    name: string
    minecraftName: string
    gender: string
    age: number
    size: number
    weight: number
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
    skillpoints: Record<'strength' | 'constitution' | 'aptness' | 'intelligence' | 'mind', Skillpoint[]>
}

export interface Account {
    id: string
    type: 'board' | 'guest'
    /** a guest password, except that it is just for one character */
    token?: string
}

export interface Skin {
    id: string
    renderedSkinpath: string
    originalSkinpath: string
    name: string
    accountId: string
    characterId: string
}

export interface StoredCharacter {
    id: string
    accountId: string
    character: Character
    /** store ids of skins */
    skins: string[]
}

export type AccountIdentifier = string | number
