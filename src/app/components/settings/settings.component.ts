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
import { EditModeService } from '../../services/edit-mode.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-settings',
  imports: [CardComponent, FormComponent, CommonModule, RouterModule, SelectionComponent, SelectionComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  trainerProfile: TrainerProfile | null = null;
  private profileSubscription!: Subscription;
  editMode = false;
  editModePokemon = false;

  constructor(private trainerService: TrainerService, private editModeService: EditModeService, private searchService: SearchService) {

  }

  ngOnInit(): void {

    this.editModeService.editMode$.subscribe(isEditing => {
      this.editMode = isEditing;
      console.log('¿Edit mode active?', this.editMode);
    });

    this.editModeService.editModePokemon$.subscribe(isEditing => {
      this.editModePokemon = isEditing;
      console.log('¿Edit mode Pokemon active?', this.editModePokemon);

    })

    this.profileSubscription = this.trainerService.trainerProfile$.subscribe(profile => {
      this.trainerProfile = profile;
      console.log('Perfil received on settings component:', profile);

    });


  }
  onSearchChange(value: string): void {
    this.searchService.updateSearchTerm(value);
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
