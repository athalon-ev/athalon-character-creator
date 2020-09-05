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

export interface Account {
    id: AccountIdentifier
    type: 'board' | 'guest'
    /** a guest password, except that it is just for one character */
    token?: string
}

export interface StoredCharacter {
    character: Character
    account: Account
}

export type AccountIdentifier = string | number