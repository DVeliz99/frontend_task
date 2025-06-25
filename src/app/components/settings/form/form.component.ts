import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { differenceInYears } from 'date-fns';
import { TrainerProfile } from '../../../models/trainerProfile.model';
import { TrainerService } from '../../../services/trainer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  trainerProfile: TrainerProfile | null = null;
  private profileSubscription!: Subscription;


  form: FormGroup;
  hobbies = [
    'Jugar Futbol',
    'Jugar Basquetball',
    'Jugar Tennis',
    'Jugar Voleibol',
    'Jugar Fifa',
    'Jugar Videojuegos',
  ];

  showHobbyMenu = false;

  // Selected hobbies stored in an array
  selectedHobbies: string[] = [];

  age: number | null = null;

  selectedHobby: string | null = null;

  constructor(private fb: FormBuilder, private trainerService: TrainerService, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cumpleaños: ['', Validators.required],
      dui: [''],
      carnet: [''],
      pasatiempo: [''],
    });

    this.form.get('cumpleaños')?.valueChanges.subscribe((fecha: string) => {
      this.age = this.calculateAge(fecha);
      this.toggleDocumentValidators();
    });

  }

  ngOnInit(): void {
    this.profileSubscription = this.trainerService.trainerProfile$.subscribe(profile => {
      this.trainerProfile = profile;
      console.log('Perfil received on form component:', profile);

      if (this.validateProfileInfofields()) {
        if (profile?.birthday) {
          this.age = this.calculateAge(profile.birthday);
          this.toggleDocumentValidators();
        }

        this.form.patchValue({
          nombre: profile?.name,
          cumpleaños: profile?.birthday,
          dui: profile?.dui,
          carnet: profile?.minor_id_card,
          pasatiempo: profile?.hobbie
        });

        this.selectedHobby = profile?.hobbie ?? null;
      }


    });
  }


  calculateAge(fecha: string): number {
    const birth = new Date(fecha);
    return differenceInYears(new Date(), birth);
  }

  // Select a hobby
  selectHobby(hobby: string): void {
    this.selectedHobby = hobby;
    this.form.get('pasatiempo')?.setValue(hobby);
    this.showHobbyMenu = false;
  }


  // Enable only the correct document field
  toggleDocumentValidators(): void {
    const duiCtrl = this.form.get('dui');
    const carnetCtrl = this.form.get('carnet');

    duiCtrl?.clearValidators();
    carnetCtrl?.clearValidators();

    if (this.age !== null && this.age >= 18) {
      duiCtrl?.setValidators([Validators.required, Validators.pattern(/^\d{8}-\d$/)]);
    } else {
      carnetCtrl?.setValidators([Validators.pattern(/^C-\d{6}$/)]);
    }

    duiCtrl?.updateValueAndValidity();
    carnetCtrl?.updateValueAndValidity();
  }


  // When user selects a hobby from dropdown
  addHobby(): void {
    const selected = this.form.get('pasatiempo')?.value;
    if (selected && !this.selectedHobbies.includes(selected)) {
      this.selectedHobbies.push(selected);
      this.form.get('pasatiempo')?.setValue('');
    }
  }

  // Clear selected hobby
  clearHobby(): void {
    this.selectedHobby = null;
    this.form.get('pasatiempo')?.setValue('');
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

  submit(): void {
    if (this.form.valid) {
      const result = {
        nombre: this.form.value.nombre,
        cumpleaños: this.form.value.cumpleaños,
        documento:
          this.age !== null && this.age >= 18
            ? this.form.value.dui
            : this.form.value.carnet,
        pasatiempo: this.form.value.pasatiempo,
      };

      const partialUpdate: Partial<TrainerProfile> = {
        name: result.nombre,
        hobbie: result.pasatiempo,
        birthday: result.cumpleaños,
        isAdult: this.age !== null && this.age >= 18
      };

      if (this.age != null && this.age >= 18) {
        partialUpdate.dui = result.documento;
      } else if (this.age != null && this.age < 18) {
        partialUpdate.minor_id_card = result.documento;

      }
      //send partial infor to observable
      this.trainerService.updatePartial(partialUpdate);
      this.router.navigate(['/loading']);
      console.log('Formulario válido:', result);
    } else {
      this.form.markAllAsTouched();
    }
  }

}
