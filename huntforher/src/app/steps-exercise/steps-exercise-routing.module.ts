import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StepsExercisePage } from './steps-exercise.page';

const routes: Routes = [
  {
    path: '',
    component: StepsExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepsExercisePageRoutingModule {}
