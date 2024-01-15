import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrcodeExercisePageRoutingModule } from './qrcode-exercise-routing.module';

import { QrcodeExercisePage } from './qrcode-exercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrcodeExercisePageRoutingModule
  ],
  declarations: [QrcodeExercisePage]
})
export class QrcodeExercisePageModule {}