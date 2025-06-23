import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  pokemons: { number: number, name: string, image: string }[] = [];
  idsPrimeraGeneracion = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Bulbasaur → Blastoise
  selectedPokemons: { number: number, name: string, image: string }[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.idsPrimeraGeneracion.forEach(id => {
      this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe(data => {
        this.pokemons.push({
          number: data.id,
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          image: data.sprites.other['official-artwork'].front_default
        });
      });
    });

  }

  togglePokemon(pokemon: { number: number, name: string, image: string }) {
    const index = this.selectedPokemons.findIndex(p => p.number === pokemon.number);

    if (index !== -1) {
      // It's already selected → we remove it
      this.selectedPokemons.splice(index, 1);
    } else {
      //It has not been selected yet 
      if (this.selectedPokemons.length < 3) {
        this.selectedPokemons.push(pokemon);
      }
    }
  }

  isSelected(pokemon: { number: number }): boolean {
    return this.selectedPokemons.some(p => p.number === pokemon.number);
  }




}
