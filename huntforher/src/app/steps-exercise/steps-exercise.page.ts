// Import necessary modules and components
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
  private maxWallets: number = 3;
  private maxRibbons: number = 2;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.startExercise();
  }

  async startExercise() {
    const position = await Geolocation.getCurrentPosition();
    if (position) {
      this.startPosition = position;
      this.startTimer();

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
      const R = 6371;
      const dLat = this.toRad(position.coords.latitude - this.startPosition.coords.latitude);
      const dLon = this.toRad(position.coords.longitude - this.startPosition.coords.longitude);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(this.startPosition.coords.latitude)) * Math.cos(this.toRad(position.coords.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c * 1000;

      this.distanceTraveled = distance;

      if (distance >= 20 && !this.isTaskCompleted) {
        this.taskCompleted();
      }

      this.cdr.detectChanges();
    }
  }

  toRad(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  doneButton() {
    this.saveResults();

    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
    }

    this.stopTimer();
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
      const timeTaken = (this.endTime - this.startTime) / 1000;

      if (timeTaken <= 300) {
        this.collectedWallets = this.maxWallets;
      } else if (timeTaken <= 360) {
        this.collectedWallets = this.maxWallets / 3;
      } else {
        this.collectedRibbons = this.maxRibbons;
      }

      this.isTaskCompleted = true;
      this.saveResults();
    }
  }

  private saveResults() {
    const currentDate = new Date();
    const dateTime = currentDate.toISOString();

    const rewardsData = {
      collectedWallets: this.collectedWallets,
      collectedRibbons: this.collectedRibbons,
      dateTime: dateTime,
    };

    const allStepsRewardsJson = localStorage.getItem('allStepsRewards');
    let allStepsRewards: any[] = [];

    if (allStepsRewardsJson) {
      allStepsRewards = JSON.parse(allStepsRewardsJson);
    }

    allStepsRewards.push(rewardsData);

    localStorage.setItem('allStepsRewards', JSON.stringify(allStepsRewards));
  }
}
