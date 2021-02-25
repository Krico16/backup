import { FirebaseService } from './../../../service/firebase.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import { Geolocation } from '@capacitor/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import * as fb from 'firebase/app';

declare var google;

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;
  commerceId: string = '';

  latitude: number = -12.073907;
  longitude: number = -77.021891;
  isFavorite: boolean = false;
  user: any;

  //Siempre inicializar vacío para que no den errores en consola
  itemData: any = {
    Name: '',
    Direction: '',
    Contact: '',
    ImageUrl: '',
    mapLoc: { x_: 0, N_: 0 },
    SocialLinks: { Facebook: '', WhatsApp: '', Instagram: '' },
  };
  contactData: any;
  rating = 2;

  constructor(
    private firestore: FirebaseService,
    private route: ActivatedRoute,
    private firebase: AngularFirestore,
    private callNumber: CallNumber
  ) {}

  ngOnInit() {
    this.commerceId = this.route.snapshot.paramMap.get('id');
    if (this.commerceId) {
      this.firestore.getCommerceId(this.commerceId).subscribe((res) => {
        this.itemData = res;
        this.user = JSON.parse(localStorage.getItem('user'));
        const data = fb.default
          .firestore()
          .collection(`users`)
          .doc(this.user.uid)
          .get()
          .then((doc) => {
            if (doc.data().favorites.includes(this.commerceId)) {
              this.isFavorite = true;
            }
          })
          .catch((err) => {
            console.log('Error obteniendo el documento:', err);
          });
      });
    }
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  async loadMap() {
    await Geolocation.getCurrentPosition()
      .then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        let userLng = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );

        let mapOptions = {
          center: userLng,
          zoom: 12,
          mapTypeId: 'roadmap', // google.maps.MapsTypeId.roadmap
        };

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );

        var userMarker = new google.maps.Marker({
          position: userLng,
          map: this.map,
        });
        setTimeout(() => {
          let commerceLng = new google.maps.LatLng(
            this.itemData.mapLoc.x_,
            this.itemData.mapLoc.N_
          );
          new google.maps.Marker({
            position: commerceLng,
            map: this.map,
          });
        }, 3000);

        this.map.addListener('dragend', () => {
          this.latitude = this.map.center.lat();
          this.longitude = this.map.center.lng();
        });
      })
      .catch((err) => {
        console.log('error obteniendo ubicacion', err);
      });
  }

  CallNumber(number) {
    this.callNumber.callNumber(number, false).catch((err) => {
      console.log('Error llamando al número');
    });
    console.log('Llamar a ', number);
  }

  AddToUser(id) {
    this.firebase
      .collection('users')
      .doc(this.user.uid)
      .update({
        favorites: fb.default.firestore.FieldValue.arrayUnion(id),
      });

    this.firebase
      .collection('commerce')
      .doc(this.commerceId)
      .update({
        userFavorite: fb.default.firestore.FieldValue.arrayUnion(this.user.uid),
      });
  }

  RemoveToUser(id) {
    this.firebase
      .collection('users')
      .doc(this.user.uid)
      .update({
        favorites: fb.default.firestore.FieldValue.arrayRemove(id),
      });
    this.firebase
      .collection('commerce')
      .doc(this.commerceId)
      .update({
        userFavorite: fb.default.firestore.FieldValue.arrayRemove(this.user.uid),
      });
  }

  changeState(id) {
    if (this.isFavorite) {
      this.RemoveToUser(id);
      this.isFavorite = false;
    } else {
      this.AddToUser(id);
      this.isFavorite = true;
    }
  }
}
