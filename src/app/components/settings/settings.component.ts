import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from '../home/list/list.component';
import { TrainerProfile } from '../../models/trainerProfile.model';
import { TrainerService } from '../../services/trainer.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectionComponent } from "./selection/selection.component";

@Component({
  selector: 'app-settings',
  imports: [CardComponent, FormComponent, ListComponent, CommonModule, RouterModule, SelectionComponent, SelectionComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

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
