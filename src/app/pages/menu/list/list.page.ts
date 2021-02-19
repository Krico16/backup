import { FirebaseService } from './../../../service/firebase.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { commerce } from 'src/app/model/commerce';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public commerceList: Observable<commerce[]>;

  constructor(private firestore: FirebaseService, private router: Router) {}

  ngOnInit() {
    this.commerceList = this.firestore.getCommerces();
  }

  goToDetails(id) {
    this.router.navigate([`menu/details/${id}`]);
  }
}
