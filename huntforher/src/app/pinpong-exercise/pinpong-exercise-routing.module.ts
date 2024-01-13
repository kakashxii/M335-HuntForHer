import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PinpongExercisePage } from './pinpong-exercise.page';

const routes: Routes = [
  {
    path: '',
    component: PinpongExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PinpongExercisePageRoutingModule {}
