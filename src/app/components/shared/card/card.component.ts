import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TrainerService } from '../../../services/trainer.service';
import { TrainerProfile } from '../../../models/trainerProfile.model';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  constructor(private trainerService: TrainerService) {

  }


  profileImageUrl: string = 'assets/no_profile.webp';

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
      input.value = ''; // limpia el input de archivo
    }
  }
}
