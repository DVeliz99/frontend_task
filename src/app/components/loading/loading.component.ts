import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit, OnChanges {

  constructor(private router: Router) {

  }


  //To make sure that data is saved
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/settings']);
    }, 4000); // 3 seconds
  }
  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.router.navigate(['/settings']);
    }, 4000); // 3 seconds

  }

}
