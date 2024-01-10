import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-playing-rules',
  templateUrl: './playing-rules.page.html',
  styleUrls: ['./playing-rules.page.scss'],
})
export class PlayingRulesPage {

  constructor(private  router: Router) {}

  startHunting() {
    this.router.navigate(['/getting-started']).then(
      () => {
        console.log('Navigation to Introduction Page successful');
      },

      (error) => {
        console.error('Navigation to Introduction Page failed')
      }
    );
  }

}
