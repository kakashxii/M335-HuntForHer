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
  isTurnedUpsideDown: boolean = false;
  checkOrientationInterval: any;

  private startTime: number | null = null;
  private endTime: number | null = null;
  public collectedWallets: number = 0;
  public collectedRibbons: number = 0;
  private maxWallets: number = 5; // amount of money-bags that can be collected

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Start the orientation listener and initiate periodic checks every 3 seconds
    this.startOrientationListener();
    this.checkOrientationInterval = setInterval(() => {
      this.checkOrientation();
    }, 3000);
  }

  ngOnDestroy() {
    // Stop the interval when the component is destroyed
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

    // Update flag based on orientation
    this.isTurnedUpsideDown = isUpsideDown;

    if (isUpsideDown) {
      // If turned upside down, enable the "Next" button
      this.isNextButtonEnabled = true;
    }

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

          // If shaken, enable the "Next" button
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
    // Stop the interval when done
    clearInterval(this.checkOrientationInterval);

    // Calculate time taken for the exercise
    this.endTime = new Date().getTime();
    const timeTaken = ((this.endTime as number) - (this.startTime as number)) / 1000; // time in seconds

    // Apply rewards based on time
    if (timeTaken <= 300) {
      // less or equals 5 minutes: 5 money-bags
      this.collectedWallets = this.maxWallets;
    } else if (timeTaken <= 360) {
      // less or equals to 6 minutes : 2 money-bags
      this.collectedWallets = this.maxWallets / 2;
    } else {
      // more than 6 minutes : 4 ribbons
      this.collectedRibbons = 4;
    }

    // Navigate to the next page or perform other actions as needed
    this.router.navigate(['/tabs/load-exercise']);
  }

  // Start the exercise and timer
  startExercise() {
    this.startTime = new Date().getTime();
  }
}
