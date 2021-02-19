import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  NativeGeocoder,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
import { FirebaseService } from './../../../service/firebase.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Map, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  map: Map;
  newMarker: any;

  //Siempre inicializar vacío para que no den errores en consola
  itemData: any = { Name: '', Direction: '', Contact: '', ImageUrl: '' };
  rating = 2;

  constructor(
    private firestore: FirebaseService,
    private route: ActivatedRoute,
    private geocoder: NativeGeocoder,
    private geoLocation: Geolocation
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.firestore.getCommerceId(id).subscribe((res) => {
        this.itemData = res;
        this.loadMap();
      });
    }
  }
  loadMap() {
    this.geoLocation.getCurrentPosition().then((res) => {
      let lat = res.coords.latitude;
      let lon = res.coords.longitude;
      this.map = new Map('mapId').setView([lat, lon], 15);

      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
        this.map
      );
      let cLat = this.itemData.mapLoc.x_;
      let cLon = this.itemData.mapLoc.N_;
      marker([cLat, cLon]).addTo(this.map);
    });
  }

  locatePosition() {
    this.map.locate({ setView: true }).on('locationfound', (e: any) => {
      this.newMarker = marker([e.latitude, e.longitude], {
        draggable: true,
      }).addTo(this.map);
      this.newMarker.bindPopup('You are located here!').openPopup();

      this.newMarker.on('dragend', () => {
        const position = this.newMarker.getLatLng();
      });
    });
  }
}
