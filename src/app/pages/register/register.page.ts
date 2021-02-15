import { FirebaseAuthService } from './../../service/firebase-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(public auth: FirebaseAuthService, public router: Router) {}

  ngOnInit() {}

  register(email, password) {
    this.auth
      .Register(email.value, password.value)
      .then((res) => {
        this.router.navigate(['login']);
      })
      .catch((err) => {
        console.log('error mio', err);
      });
  }
}
