import { Component } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from '../home/list/list.component';

@Component({
  selector: 'app-settings',
  imports: [CardComponent, FormComponent, ListComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
