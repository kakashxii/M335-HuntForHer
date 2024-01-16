import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-exercise-turnphone',
  templateUrl: './exercise-turnphone.page.html',
  styleUrls: ['./exercise-turnphone.page.scss'],
})
export class ExerciseTurnphonePage implements OnInit, OnDestroy {
  isHeadTurned: boolean = false;
  isNextButtonEnabled: boolean = false;
  checkOrientationInterval: any;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Start the orientation listener and initiate periodic checks every 3 seconds
    this.startOrientationListener();
    this.checkOrientationInterval = setInterval(() => {
      this.checkOrientation();
    }, 3000);
  }

  ngOnDestroy() {
<<<<<<< HEAD
    // Stop the interval when the component is destroyed
=======
>>>>>>> 01e8c14a274a790a86bc25be7bbca242abf38d2a
    clearInterval(this.checkOrientationInterval);
  }

  startOrientationListener() {
    // Add an event listener for device motion
    window.addEventListener('devicemotion', (event) => {
      this.handleDeviceMotion(event);
    });

    // Initial check when the page loads
    this.checkOrientation();
  }

  checkOrientation() {
    // Check if the device is upside down (landscape orientation)
    const isUpsideDown = this.isDeviceUpsideDown();
    console.log('Is upside down:', isUpsideDown);

    // Update flags based on orientation
    this.isHeadTurned = isUpsideDown;
    this.isNextButtonEnabled = isUpsideDown;
    this.cdr.detectChanges(); // Manually trigger Change Detection
  }

  handleDeviceMotion(event: DeviceMotionEvent | null) {
    if (event && event.accelerationIncludingGravity) {
      const acceleration = event.accelerationIncludingGravity;
      const shakeThreshold = 20;

      if (acceleration.x !== null && acceleration.y !== null && acceleration.z !== null) {
        if (Math.abs(acceleration.x) > shakeThreshold ||
          Math.abs(acceleration.y) > shakeThreshold ||
          Math.abs(acceleration.z) > shakeThreshold) {
          // Device is shaken
          console.log('Device shaken');
          this.isHeadTurned = true;
          this.isNextButtonEnabled = true;
          this.cdr.detectChanges(); // Manually trigger Change Detection
        }
      }
    }
  }

  isDeviceUpsideDown(): boolean {
    const screenOrientation = (window.screen as any).orientation;
    return screenOrientation && (screenOrientation.type.includes('portrait') || screenOrientation.type.includes('reverse'));
  }

  doneButton() {
    this.router.navigate(['/tabs/load-exercise']);
  }
}
