import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrcodeExercisePage } from './qrcode-exercise.page';

const routes: Routes = [
  {
    path: '',
    component: QrcodeExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrcodeExercisePageRoutingModule {}
