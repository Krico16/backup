import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userData: any = {
    displayName: '',
    photoURL: '',
  };

  constructor(private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.getData();
    });
  }

  getData() {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }
}
