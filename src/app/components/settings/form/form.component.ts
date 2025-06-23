import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { differenceInYears } from 'date-fns';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

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

  constructor(private fb: FormBuilder) {
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
      carnetCtrl?.setValidators([Validators.required, Validators.pattern(/^C-\d{6}$/)]);
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
      console.log('Formulario válido:', result);
    } else {
      this.form.markAllAsTouched();
    }
  }

}
