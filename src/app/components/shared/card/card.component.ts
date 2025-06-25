import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../../services/trainer.service';
import { TrainerProfile } from '../../../models/trainerProfile.model';
import { Subscription } from 'rxjs';
import { differenceInYears } from 'date-fns';
import { EditModeService } from '../../../services/edit-mode.service';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  trainerProfile: TrainerProfile | null = null;
  private profileSubscription!: Subscription;
  profileImageUrl: string = 'assets/no_profile.webp';
  age!: number | null;
  editMode = false;

  constructor(private trainerService: TrainerService, private editModeService: EditModeService) {

  }

  ngOnInit(): void {

    this.editModeService.editMode$.subscribe(isEditing => {
      this.editMode = isEditing;
      console.log('¿Edit mode active?', this.editMode);
    });
    this.profileSubscription = this.trainerService.trainerProfile$.subscribe(profile => {
      this.trainerProfile = profile;
      console.log('Perfil received on card component:', profile);
      this.profileImageUrl = this.trainerProfile?.profilePicture ?? 'assets/no_profile.webp';

      if (profile?.birthday) {
        this.calculateAge(profile.birthday);
      }

    });
  }


  calculateAge(fecha: string): number {
    const birth = new Date(fecha);

    this.age = differenceInYears(new Date(), birth);
    return this.age;
  }



  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.profileImageUrl = e.target.result as string;
          // console.log('new url as profile picture', this.profileImageUrl);

          //send image url to observable
          this.trainerService.updatePartial({
            profilePicture: this.profileImageUrl
          });

        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  resetProfileImage(): void {
    this.profileImageUrl = 'assets/no_profile.webp';
    const input = document.getElementById('add-file') as HTMLInputElement;
    if (input) {
      input.value = ''; // clean input 
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

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();  // Unsubscribe to prevent memory leaks
  }
}
