import { FirebaseAuthService } from './../../service/firebase-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(public authService: FirebaseAuthService, public router: Router) {}

  ngOnInit() {}

  login(email, password) {
    this.authService
      .SignIn(email.value, password.value)
      .then((res) => {
        this.router.navigate(['menu']);
      })
      .catch((err) => {
        console.log('mi error:', err);
      });
  }
}
