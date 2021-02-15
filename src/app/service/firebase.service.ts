import { commerce } from './../model/commerce';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private commerce: Observable<commerce[]>;
  private commerceCollection: AngularFirestoreCollection<commerce>;

  collectionName = 'commerces';

  constructor(private firestore: AngularFirestore) {
    this.commerceCollection = this.firestore.collection<commerce>('commerce');
    this.commerce = this.commerceCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getCommerces(): Observable<commerce[]> {
    return this.commerce;
  }

  getCommerceId(id: string): Observable<commerce> {
    return this.commerceCollection
      .doc<commerce>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((res) => {
          res.id = id;
          return res;
        })
      );
  }

  createCommerce(data: commerce): Promise<DocumentReference> {
    return this.commerceCollection.add(data);
  }

  updateCommerce(data: commerce): Promise<void> {
    return this.commerceCollection.doc(data.id).update({
      Name: data.Name,
      Contact: data.Contact,
      Direction: data.Direction,
      SocialLinks: data.SocialLinks,
      ImageUrl: data.ImageUrl,
    });
  }
}
