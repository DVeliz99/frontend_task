export interface Pokemon {
    name: string;
    type: string;
    image: string; // URL or Base64
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