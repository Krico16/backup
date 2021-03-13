import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userData: any = {
    displayName: 'Usuario anonimo',
    photoURL: 'https://pbs.twimg.com/profile_images/3561617856/cde7c8d60a412ac1e8c956566d07dc39_400x400.jpeg',
  };

  constructor(private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.getData();
    });
  }

  getData() {
    if(localStorage.getItem('user')){
      this.userData = JSON.parse(localStorage.getItem('user'));
    }
  }
}
