import { Component } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { ListComponent } from "./list/list.component";

@Component({
  selector: 'app-home',
  imports: [CardComponent, ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
