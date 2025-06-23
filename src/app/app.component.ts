import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CardComponent } from './components/shared/card/card.component';
import { HomeComponent } from './components/home/home.component';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { TrainerService } from './services/trainer.service';
import { TrainerProfile } from './models/trainerProfile.model';
import { Subscription } from 'rxjs';
import { ListComponent } from './components/home/list/list.component';


@Component({
  selector: 'app-root',
  imports: [MobileHeaderComponent, HeaderComponent, RouterOutlet, HomeComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend_task';
  trainerProfile: TrainerProfile | null = null;
  private profileSubscription!: Subscription;
  profileImageUrl: string = 'assets/no_profile.webp';
  age!: number | null;

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
