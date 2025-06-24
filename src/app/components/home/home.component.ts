import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { ListComponent } from "./list/list.component";


import { TrainerProfile } from '../../models/trainerProfile.model';
import { TrainerService } from '../../services/trainer.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CardComponent, ListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  trainerProfile: TrainerProfile | null = null;
  private profileSubscription!: Subscription;

  constructor(private trainerService: TrainerService) {

  }

  ngOnInit(): void {
    this.profileSubscription = this.trainerService.trainerProfile$.subscribe(profile => {
      this.trainerProfile = profile;
      console.log('Perfil received on settings component:', profile);

    });
  }

  validateProfileInfofields(): boolean {
    const p = this.trainerProfile;
    return (
      !!p &&
      p.birthday !== '' &&
      p.name !== '' &&
      p.hobbie !== '' &&
      (p.dui !== '' || p.minor_id_card !== '')
    );
  }


}
