import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PinpongExercisePageRoutingModule } from './pinpong-exercise-routing.module';

import { PinpongExercisePage } from './pinpong-exercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinpongExercisePageRoutingModule
  ],
  declarations: [PinpongExercisePage]
})
export class PinpongExercisePageModule {


}
