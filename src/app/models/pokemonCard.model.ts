export type PokemonCard = {
    number: number;
    name: string;
    image: string;
    type: string;
    stats: {
        salud: number;
        ataque: number;
        defensa: number;
        ataqueEspecial: number;
        defensaEspecial: number;
        velocidad: number;
    };
};
