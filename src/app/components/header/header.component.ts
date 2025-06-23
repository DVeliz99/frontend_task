import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TrainerProfile } from '../../models/trainerProfile.model';
import { TrainerService } from '../../services/trainer.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  trainerProfile: TrainerProfile | null = null;
  private profileSubscription!: Subscription;

  constructor(private trainerService: TrainerService) {

  }
  ngOnInit(): void {
    if (!this.trainerService.getTrainerProfile()) {
      this.trainerService.setTrainerProfile();
    } else {
      this.profileSubscription = this.trainerService.trainerProfile$.subscribe(profile => {
        this.trainerProfile = profile;
        console.log('Perfil received on card component:', profile);




      });
    }
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
