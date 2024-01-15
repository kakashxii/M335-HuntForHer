import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadExercisePage } from './load-exercise.page';

const routes: Routes = [
  {
    path: '',
    component: LoadExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadExercisePageRoutingModule {}
