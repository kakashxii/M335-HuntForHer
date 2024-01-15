import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExerciseTurnphonePageRoutingModule } from './exercise-turnphone-routing.module';

import { ExerciseTurnphonePage } from './exercise-turnphone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExerciseTurnphonePageRoutingModule
  ],
  declarations: [ExerciseTurnphonePage]
})
export class ExerciseTurnphonePageModule {}
