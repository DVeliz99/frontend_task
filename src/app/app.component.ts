import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CardComponent } from './components/shared/card/card.component';
import { HomeComponent } from './components/home/home.component';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { TrainerService } from './services/trainer.service';

@Component({
  selector: 'app-root',
  imports: [MobileHeaderComponent, SettingsComponent, HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend_task';

  constructor(private trainerService: TrainerService) {

  }


  ngOnInit(): void {
    if (!this.trainerService.getTrainerProfile()) {
      this.trainerService.setTrainerProfile();
    }
  }
}
