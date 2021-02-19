import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public router: Router) {}

  goTo(page) {
    this.router.navigate([page]);
  }
}
