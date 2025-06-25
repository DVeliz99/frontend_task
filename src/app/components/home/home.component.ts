import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { ListComponent } from "./list/list.component";


import { TrainerProfile } from '../../models/trainerProfile.model';
import { TrainerService } from '../../services/trainer.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EditModeService } from '../../services/edit-mode.service';


@Component({
  selector: 'app-home',
  imports: [CardComponent, ListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  trainerProfile: TrainerProfile | null = null;
  private profileSubscription!: Subscription;

  constructor(private trainerService: TrainerService, private router: Router, private editModeService: EditModeService) {

  }

  ngOnInit(): void {
    this.profileSubscription = this.trainerService.trainerProfile$.subscribe(profile => {
      this.trainerProfile = profile;
      console.log('Perfil received on settings component:', profile);

    });

    this.editModeService.disableEditMode();
    this.editModeService.disableEditModePokemon();
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

  goToEdit() {
    this.editModeService.enableEditMode();
    this.router.navigate(['/settings']);
  }

  goToEditPokemon() {
    this.editModeService.enableEditModePokemon();
    this.router.navigate(['/settings']);
  }


}
