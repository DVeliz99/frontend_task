import { Component } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-settings',
  imports: [CardComponent, FormComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
