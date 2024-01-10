import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayingRulesPage } from './playing-rules.page';

const routes: Routes = [
  {
    path: '',
    component: PlayingRulesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayingRulesPageRoutingModule {}
