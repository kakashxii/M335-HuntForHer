import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-exercise-turnphone',
  templateUrl: './exercise-turnphone.page.html',
  styleUrls: ['./exercise-turnphone.page.scss'],
})
export class ExerciseTurnphonePage implements OnInit {
  isHeadTurned: boolean = false;
  isUpsideDownDetected: boolean = false;
  isNextButtonEnabled: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.startOrientationListener();
  }

  startOrientationListener() {
    window.addEventListener('orientationchange', () => {
      // Check if the device is in a portrait upside-down orientation
      const isUpsideDown = window.matchMedia("(orientation: portrait-upside-down)").matches;

      if (isUpsideDown && !this.isUpsideDownDetected) {
        // The device is upside down, and it's the first time detecting it
        this.isHeadTurned = true;
        this.isUpsideDownDetected = true;
        this.isNextButtonEnabled = true; // Enable the Next button
        // You can perform additional actions when the device is upside down
      } else {
        // The device is not upside down or has been detected before
        this.isHeadTurned = false;
        this.isNextButtonEnabled = false; // Disable the Next button
      }
    });

    // Initial check when the page loads
    const initialUpsideDown = window.matchMedia("(orientation: portrait-upside-down)").matches;
    if (initialUpsideDown) {
      this.isHeadTurned = true;
      this.isUpsideDownDetected = true;
      this.isNextButtonEnabled = true;
    }
  }

  doneButton() {
    this.router.navigate(['/tabs/load-exercise']);
  }
}
