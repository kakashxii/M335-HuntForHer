import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExerciseWlanPageRoutingModule } from './exercise-wlan-routing.module';

import { ExerciseWlanPage } from './exercise-wlan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExerciseWlanPageRoutingModule
  ],
  declarations: [ExerciseWlanPage]
})
export class ExerciseWlanPageModule {}
