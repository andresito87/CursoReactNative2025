export interface Pokemon {
    id: number,
    name: string,
    types: string[],
    avatar: string,
    sprites: string[],
    color: string; // color predominante del pokemon
    games: string[], // videojuegos en los que aparece
    stats: Stat[],
    abilities: string[],
    moves: Move[];  // tipos de ataques
}

export interface Stat {
    name: string,
    value: number;
}

export interface Move {
    name: string,
    level: number;
}