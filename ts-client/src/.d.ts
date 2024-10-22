export enum NoteLevel {
    LOW,
    MED,
    HIGH
}

export enum BoardType {
    PIN,
    PLAIN
}

export interface Note {
    id: number
    text: string
    level: NoteLevel
    zIndex?: number
}

export interface Board {
    id: number
    boardType: BoardType
    user: string
}