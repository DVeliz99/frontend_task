import { Component } from '@angular/core';

import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TrainerProfile } from '../../../models/trainerProfile.model';
import { TrainerService } from '../../../services/trainer.service';
import { Subscription } from 'rxjs';
import { PokemonCard } from '../../../models/pokemonCard.model';
import { Router } from '@angular/router';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-selection',
  imports: [CommonModule],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css'
})
export class SelectionComponent {


  pokemons: PokemonCard[] = [];
  allPokemons: PokemonCard[] = [];
  selectedPokemons: PokemonCard[] = [];
  idsPrimeraGeneracion = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Bulbasaur → Blastoise

  trainerProfile: TrainerProfile | null = null;
  private profileSubscription!: Subscription;



  constructor(private searchService: SearchService, private http: HttpClient, private trainerService: TrainerService, private router: Router) { }

  ngOnInit(): void {
    this.idsPrimeraGeneracion.forEach(id => {
      this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe(data => {
        const pokemon: PokemonCard = {
          number: data.id,
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          image: data.sprites.other['official-artwork'].front_default,
          type: data.types[0]?.type.name ?? 'unknown',
          stats: {
            salud: data.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
            ataque: data.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
            defensa: data.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
            ataqueEspecial: data.stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 0,
            defensaEspecial: data.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 0,
            velocidad: data.stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 0
          }
        };


        this.allPokemons.push(pokemon);
        this.pokemons = [...this.allPokemons];
      });
    });


    this.searchService.searchTerm$.subscribe(term => {
      this.pokemons = this.filterPokemons(term);
    });

  }


  togglePokemon(pokemon: PokemonCard) {
    const index = this.selectedPokemons.findIndex(p => p.number === pokemon.number);

    if (index !== -1) {
      this.selectedPokemons.splice(index, 1);
    } else {
      if (this.selectedPokemons.length < 3) {
        this.selectedPokemons.push(pokemon);
        console.log(this.selectedPokemons);
      }
    }
  }

  filterPokemons(term: string): PokemonCard[] {
    const value = term.trim().toLowerCase();

    if (!value) return this.allPokemons;

    const isNumeric = /^\d+$/.test(value);

    if (isNumeric) {
      const id = parseInt(value, 10);
      return this.allPokemons.filter(p => p.number === id);
    }

    return this.allPokemons.filter(p =>
      p.name.toLowerCase().includes(value)
    );
  }





  isSelected(pokemon: { number: number }): boolean {
    return this.selectedPokemons.some(p => p.number === pokemon.number);
  }

  OnSubmit() {

    console.log('onSubmit triggered');

    if (this.selectedPokemons.length === 3) {
      const pokemonsForProfile = this.selectedPokemons.map(p => ({
        name: p.name,
        type: p.type,
        image: p.image,
        stats: { ...p.stats }
      }));

      const partialUpdate: Partial<TrainerProfile> = {
        pokemon: pokemonsForProfile
      };

      this.trainerService.updatePartial(partialUpdate);
      console.log('Pokémon enviados al perfil:', pokemonsForProfile);

      this.router.navigate(['/loading'], {
        queryParams: { redirectTo: 'home' }
      });

    }
  }

}
