import { Pokemon } from "./pokemon.model";

export interface TrainerProfile {
    name?: string;
    hobbie?: string;
    birthday?: string; // (Date could be)
    isAdult?: boolean;
    profilePicture?: string; // Base64 or URL
    minor_id_card?: string;
    dui?: string;
    pokemon?: Pokemon[];

}
