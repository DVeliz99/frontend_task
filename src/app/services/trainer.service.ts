import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrainerProfile } from '../models/trainerProfile.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private trainerProfileSubject = new BehaviorSubject<TrainerProfile | null>(null);
  trainerProfile$ = this.trainerProfileSubject.asObservable();

  setTrainerProfilePersonalInfo(profile: TrainerProfile) {
    this.trainerProfileSubject.next(profile);
  }


  //To avoid having currentProfile =null
  setTrainerProfile() {
    const trainerProfile: TrainerProfile = {
      name: '',
      hobbie: '',
      birthday: '',
      isAdult: false,
      pokemon: []
    };

    this.trainerProfileSubject.next(trainerProfile);
    console.log('Trainer profile initialized:', trainerProfile);


  }

  updatePartial(data: Partial<TrainerProfile>) {
    const current = this.trainerProfileSubject.value;
    if (current) {
      const updatedProfile = { ...current, ...data };
      console.log('Perfil actualizado:', updatedProfile);
      this.trainerProfileSubject.next(updatedProfile);
    }
  }

  getTrainerProfile(): TrainerProfile | null {
    return this.trainerProfileSubject.value;
  }

  //to set trainer url image
  setUrlProfile(data: TrainerProfile | null) {
    // console.log('data received', data);

    this.trainerProfileSubject.next(data);
  }
}
