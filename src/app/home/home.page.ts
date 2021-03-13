import { FirebaseAuthService } from './../service/firebase-auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public router: Router,private anon : FirebaseAuthService) {}

  goTo(page) {
    this.router.navigate([page]);
  }

  signInAnon(){
    this.anon.SignInAnon().then(r=>{
      this.router.navigate(['menu'])
    })
  }
}
