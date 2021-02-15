import { user } from './../model/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as auth from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  userData: any;

  constructor(
    public fireAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    public router: Router
  ) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  SignIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  SignInAnon() {
    return this.fireAuth.signInAnonymously();
  }

  Register(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  GoogleAuth() {
    return this.ExternalLogin(new auth.default.auth.GoogleAuthProvider());
  }

  logOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }

  get isLogged(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? true : false;
  }

  ExternalLogin(provider) {
    return this.fireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['menu/list']);
        this.setUserData(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );

    const userData: user = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(userData, { merge: true });
  }
}
