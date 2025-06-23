import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TrainerProfile } from '../../../models/trainerProfile.model';
import { TrainerService } from '../../../services/trainer.service';
import { Subscription } from 'rxjs';
import { PokemonCard } from '../../../models/pokemonCard.model';


@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }


}
