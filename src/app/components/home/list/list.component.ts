import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TrainerProfile } from '../../../models/trainerProfile.model';
import { TrainerService } from '../../../services/trainer.service';
import { Subscription } from 'rxjs';
import { PokemonCard } from '../../../models/pokemonCard.model';
import { Pokemon, PokemonStats } from '../../../models/pokemon.model';
import { ScrollingModule } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-list',
  imports: [CommonModule, ScrollingModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  private profileSubscription!: Subscription;

  statLabels: { [key: string]: string } = {
    salud: 'HP',
    ataque: 'Ataque',
    defensa: 'Defensa',
    ataqueEspecial: 'Ataque Especial',
    defensaEspecial: 'Defensa Especial',
    velocidad: 'Velocidad'
  };

  readonly maxStats: { [key: string]: number } = {
    salud: 255,
    ataque: 190,
    defensa: 230,
    ataqueEspecial: 194,
    defensaEspecial: 230,
    velocidad: 180
  };

  constructor(private trainerService: TrainerService) {

  }

  ngOnInit(): void {

    const profile = this.trainerService.getTrainerProfile();
    if (profile?.pokemon) {
      this.pokemons = profile.pokemon.slice(0, 3); //shows the first three elements
      console.log('Pokemons on list component', this.pokemons);

    }
  }

  getColor(type: string): string {
    switch (type.toLowerCase()) {
      case 'grass': return '#48bb78';
      case 'fire': return '#f6ad55';
      case 'water': return '#4299e1';
      default: return '#a0aec0';

    }
  }




  getStatKeys(stats: PokemonStats): string[] {
    return Object.keys(stats);
  }


  getStatEntries(stats: PokemonStats): { key: string; value: number }[] {
    return Object.entries(stats).map(([key, value]) => {
      const max = this.maxStats[key] || 100; // fallback en caso de key no registrada
      const percent = Math.min((value / max) * 100, 100); // does not exceed the limit
      return { key, value: Math.round(percent) };
    });
  }




}
