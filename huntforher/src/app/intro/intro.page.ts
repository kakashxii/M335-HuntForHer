import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {

  constructor(private  router: Router) {}

  goToRulesPage(){
    this.router.navigate( ['./tabs/playing-rules']).then(
      () => {
        console.log('Navigation to Introduction Page successful');
      },
      (error) => {
        console.error('Navigation to Introduction Page failed')
      }
    );
  }
}
