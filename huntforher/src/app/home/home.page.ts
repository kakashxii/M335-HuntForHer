import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private  router: Router) {}

  //navigate to intro pae
  goToIntroPage(){
    this.router.navigate( ['./tabs/intro']).then(
      () => {
        console.log('Navigation to Introduction Page successful');
      },
      (error) => {
        console.error('Navigation to Introduction Page failed')
      }
    );
  }

}
