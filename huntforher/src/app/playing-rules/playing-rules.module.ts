import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayingRulesPageRoutingModule } from './playing-rules-routing.module';

import { PlayingRulesPage } from './playing-rules.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayingRulesPageRoutingModule
  ],
  declarations: [PlayingRulesPage]
})
export class PlayingRulesPageModule {}
