import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExerciseWlanPage } from './exercise-wlan.page';

const routes: Routes = [
  {
    path: '',
    component: ExerciseWlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseWlanPageRoutingModule {}
