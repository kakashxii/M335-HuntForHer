import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-exercise-turnphone',
  templateUrl: './exercise-turnphone.page.html',
  styleUrls: ['./exercise-turnphone.page.scss'],
})
export class ExerciseTurnphonePage implements OnInit {
  isHeadTurned: boolean = false;
  isNextButtonEnabled: boolean = false;
  checkOrientationInterval: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.startOrientationListener();
    this.checkOrientationInterval = setInterval(() => {
      this.checkOrientation();
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.checkOrientationInterval);
  }

  startOrientationListener() {
    window.addEventListener('orientationchange', () => {
      console.log('Orientation changed');
      this.checkOrientation();
    });

    // Initial check when the page loads
    this.checkOrientation();
  }

  checkOrientation() {
    const isUpsideDown = window.matchMedia("(orientation: landscape)").matches;
    console.log('Is upside down:', isUpsideDown);

    if (isUpsideDown) {
      this.isHeadTurned = true;
      this.isNextButtonEnabled = true;
    } else {
      this.isHeadTurned = false;
      this.isNextButtonEnabled = false;
    }
  }

  doneButton() {
    this.router.navigate(['/tabs/load-exercise']);
  }
}
