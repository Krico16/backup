import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { RatingComponent } from 'src/app/components/rating/rating.component';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DetailsPageRoutingModule],
  declarations: [DetailsPage, RatingComponent],
  providers:[CallNumber]
})
export class DetailsPageModule {}
