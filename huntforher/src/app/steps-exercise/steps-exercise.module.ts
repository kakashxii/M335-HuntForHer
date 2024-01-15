import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StepsExercisePageRoutingModule } from './steps-exercise-routing.module';

import { StepsExercisePage } from './steps-exercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StepsExercisePageRoutingModule
  ],
  declarations: [StepsExercisePage]
})
export class StepsExercisePageModule {}
