export interface Query {
    _limit?: string
    _offset?: string
    _properties?: string
}

export interface ParsedQuery {
    _limit: number
    _offset: number
    _properties: string[]
}