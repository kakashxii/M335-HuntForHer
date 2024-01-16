import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Geolocation, PositionOptions, Position } from '@capacitor/geolocation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-steps-exercise',
  templateUrl: './steps-exercise.page.html',
  styleUrls: ['./steps-exercise.page.scss'],
})
export class StepsExercisePage implements OnInit {
  private startPosition: Position | null = null;
  public distanceTraveled: number = 0;
  private watchId: string | undefined;
  private startTime: number | null = null;
  private endTime: number | null = null;
  private isTaskCompleted: boolean = false;
  public collectedWallets: number = 0;
  public collectedRibbons: number = 0;
  private maxWallets: number = 3; // Increase the maxWallets to 3 for this exercise
  private maxRibbons: number = 2; // Set the maxRibbons to 2 for this exercise

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    await this.startExercise();
  }

  async startExercise() {
    // Get initial position
    const position = await Geolocation.getCurrentPosition();
    if (position) {
      this.startPosition = position;
      this.startTimer();

      // Watch for position changes
      const watchOptions: PositionOptions = { enableHighAccuracy: true };
      const watchId = await Geolocation.watchPosition(watchOptions, (position: Position | null, err) => {
        if (position && this.startPosition) {
          this.updateDistance(position);
        }
      });

      this.watchId = watchId;
    }
  }

  updateDistance(position: Position) {
    if (this.startPosition) {
      // Calculate distance using Haversine formula
      const R = 6371; // Earth radius in km
      const dLat = this.toRad(position.coords.latitude - this.startPosition.coords.latitude);
      const dLon = this.toRad(position.coords.longitude - this.startPosition.coords.longitude);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(this.startPosition.coords.latitude)) * Math.cos(this.toRad(position.coords.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c * 1000; // Convert to meters

      // Update distance in real-time
      this.distanceTraveled = distance;

      if (distance >= 1000 && !this.isTaskCompleted) {
        // Reward logic based on distance traveled
        this.taskCompleted();
      }

      this.cdr.detectChanges(); // Manually trigger change detection after updating distance
    }
  }

  toRad(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  doneButton() {
    this.saveResults(); // Save results before navigating

    // Stop watching position changes
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
    }

    this.stopTimer();
    // Navigate to another page or perform further actions here
    this.router.navigate(['/tabs/qrcode-exercise'], {
      state: {
        distanceTraveled: this.distanceTraveled,
        collectedWallets: this.collectedWallets,
        collectedRibbons: this.collectedRibbons,
      },
    });
  }

  private startTimer() {
    this.startTime = new Date().getTime();
  }

  private stopTimer() {
    this.endTime = new Date().getTime();
  }

  private taskCompleted() {
    if (this.endTime && this.startTime) {
      const timeTaken = (this.endTime - this.startTime) / 1000; // time in seconds

      // Your reward logic based on time taken
      if (timeTaken <= 300) {
        // less or equals 5 minutes: 3 money-bags
        this.collectedWallets = this.maxWallets;
      } else if (timeTaken <= 360) {
        // less or equals to 6 minutes: 1 money-bag
        this.collectedWallets = this.maxWallets / 3;
      } else {
        // more than 6 minutes: 2 ribbons
        this.collectedRibbons = this.maxRibbons;
      }

      this.isTaskCompleted = true;
      this.saveResults(); // Save results when the task is completed
    }
  }

  private saveResults() {
    const currentDate = new Date();
    const dateTime = currentDate.toISOString();

    const rewardsData = {
      collectedWallets: this.collectedWallets,
      collectedRibbons: this.collectedRibbons,
      dateTime: dateTime
    };

    // Retrieve existing rewards from local storage
    const allStepsRewardsJson = localStorage.getItem('allStepsRewards');
    let allStepsRewards: any[] = [];

    if (allStepsRewardsJson) {
      allStepsRewards = JSON.parse(allStepsRewardsJson);
    }

    // Append the new rewards data to the array
    allStepsRewards.push(rewardsData);

    // Store the updated rewards array in local storage
    localStorage.setItem('allStepsRewards', JSON.stringify(allStepsRewards));
  }
}
