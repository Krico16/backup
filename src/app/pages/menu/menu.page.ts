import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  /**
   * TESTING VARIABLES
   **/

  hasNotifications = true;
  NotificationsCount = 3;


  constructor() {}

  ngOnInit() {}
}
