import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadExercisePageRoutingModule } from './load-exercise-routing.module';

import { LoadExercisePage } from './load-exercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadExercisePageRoutingModule
  ],
  declarations: [LoadExercisePage]
})
export class LoadExercisePageModule {}
