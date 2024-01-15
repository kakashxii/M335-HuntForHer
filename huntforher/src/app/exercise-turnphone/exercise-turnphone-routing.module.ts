import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExerciseTurnphonePage } from './exercise-turnphone.page';

const routes: Routes = [
  {
    path: '',
    component: ExerciseTurnphonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseTurnphonePageRoutingModule {}
