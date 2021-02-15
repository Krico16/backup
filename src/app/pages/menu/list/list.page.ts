import { FirebaseService } from './../../../service/firebase.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { commerce } from 'src/app/model/commerce';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public commerceList: Observable<commerce[]>;

  constructor(private firestore: FirebaseService) {}

  ngOnInit() {
    this.commerceList = this.firestore.getCommerces();
  }
}
