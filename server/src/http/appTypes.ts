export interface Query {
    limit?: string
    offset?: string
    properties?: string
    filter?: string
}

export interface ParsedQuery {
    limit: number
    offset: number
    filter: string[][] | null
    properties: string[]
}