export interface Pokemon {
    name: string;
    type: string;
    image: string;
    stats: PokemonStats;
}

export interface PokemonStats {
    salud: number;
    ataque: number;
    defensa: number;
    ataqueEspecial: number;
    defensaEspecial: number;
    velocidad: number;
}
