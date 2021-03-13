import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from './../../../service/firebase.service';
import { Component, OnInit } from '@angular/core';
import * as fb from 'firebase/app';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  user: any;
  favoriteList: any[];

  constructor(
    private firestore: FirebaseService,
    private firebase: AngularFirestore
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getFavorites(this.user.uid).then((d) => (this.favoriteList = d));
  }

  getFavorites(uid: string): Promise<Array<any>> {
    return fb.default
      .firestore()
      .collection('commerce')
      .where('userFavorite', 'array-contains', uid)
      .get()
      .then((snapshot) => {
        const data: any[] = [];
        snapshot.forEach((snap) => {
          data.push(snap.data());
          return false;
        });
        return data;
      });
  }
}
