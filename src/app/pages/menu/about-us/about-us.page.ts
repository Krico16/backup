import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;


  constructor() { }

  ngOnInit() {
  }

  slideOpts = {
    centerSlides: true,
    effect: 'fade',
    pager: true,
    paginationType: 'arrows'
  }

}
