import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit, OnChanges {
  redirectTo: string = '/settings'; //default value

  constructor(private router: Router, private route: ActivatedRoute) {

  }


  //To make sure that data is saved
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.redirectTo = params['redirectTo'] || '/settings';

      setTimeout(() => {
        this.router.navigate(['/' + this.redirectTo]);
      }, 4000);
    });
  }


  ngOnChanges(changes: SimpleChanges): void {


  }

}
