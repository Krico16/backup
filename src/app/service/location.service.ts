import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy
  ) {}

  askToTurnOnGPS() {
    console.log('ask');
  }
  // Check if application having GPS access permission
  checkGPSPermission() {
    console.log('check');
  }
}
