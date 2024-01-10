import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastHuntsPageRoutingModule } from './past-hunts-routing.module';

import { PastHuntsPage } from './past-hunts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastHuntsPageRoutingModule
  ],
  declarations: [PastHuntsPage]
})
export class PastHuntsPageModule {}
