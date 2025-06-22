import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrainerProfile } from '../models/trainerProfile.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private trainerProfileSubject = new BehaviorSubject<TrainerProfile | null>(null);
  trainerProfile$ = this.trainerProfileSubject.asObservable();

  setTrainerProfile(profile: TrainerProfile) {
    this.trainerProfileSubject.next(profile);
  }

  updatePartial(data: Partial<TrainerProfile>) {
    const current = this.trainerProfileSubject.value;
    if (current) {
      this.trainerProfileSubject.next({ ...current, ...data });
    }
  }

  getTrainerProfile(): TrainerProfile | null {
    return this.trainerProfileSubject.value;
  }
}
