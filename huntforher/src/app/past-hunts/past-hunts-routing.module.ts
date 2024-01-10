import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastHuntsPage } from './past-hunts.page';

const routes: Routes = [
  {
    path: '',
    component: PastHuntsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastHuntsPageRoutingModule {}
