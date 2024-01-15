// pinpong-exercise.page.ts
import { Component, OnInit } from '@angular/core';
import { Geolocation, PositionOptions, Position } from '@capacitor/geolocation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pinpong-exercise',
  templateUrl: './pinpong-exercise.page.html',
  styleUrls: ['./pinpong-exercise.page.scss'],
})
export class PinpongExercisePage implements OnInit {
  pingPongTableCoordinates = { latitude: 47.071945403994924, longitude: 8.348885173299777 };
  currentLocation: Position | undefined;
  distanceToPingPongTable: number | undefined;

  watchPositionId: string | undefined;
  private startTime: number | null = null;
  private endTime: number | null = null;
  private isTaskCompleted: boolean = false;
  public collectedWallets: number = 0;
  public collectedRibbons: number = 0;
  private maxWallets: number = 2; // amount of money-bags that can be collected

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.startWatchingPosition();
  }

  async startWatchingPosition() {
    const watchOptions: PositionOptions = {
      maximumAge: 3000,
      timeout: 10000,
      enableHighAccuracy: true
    };

    try {
      this.watchPositionId = await Geolocation.watchPosition(watchOptions, async (position, err) => {
        if (err) {
          console.error('Error watching position:', err);
        } else {
          this.currentLocation = position || undefined;
          await this.calculateDistance();
        }
      });
      this.startTimer(); // start timer when watchPosition begins
    } catch (error) {
      console.error('Error starting watch position:', error);
    }
  }

  async calculateDistance() {
    if (this.currentLocation) {
      const distance = this.haversineDistance(
        {
          latitude: this.currentLocation.coords.latitude,
          longitude: this.currentLocation.coords.longitude
        },
        this.pingPongTableCoordinates
      );

      console.log('Distance to Ping Pong Table:', distance);
      this.distanceToPingPongTable = distance;

      if (distance <= 5 && !this.isTaskCompleted) {
        await this.taskCompleted();
      }
    }
  }

  haversineDistance(coords1: { latitude: number; longitude: number }, coords2: { latitude: number; longitude: number }): number {
    const R = 6371000; // Earth's radius in meters
    const lat1Rad = coords1.latitude * (Math.PI / 180);
    const lat2Rad = coords2.latitude * (Math.PI / 180);
    const deltaLat = (coords2.latitude - coords1.latitude) * (Math.PI / 180);
    const deltaLon = (coords2.longitude - coords1.longitude) * (Math.PI / 180);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance; // in meters
  }

  private async taskCompleted() {
    this.endTime = new Date().getTime();
    const timeTaken = ((this.endTime as number) - (this.startTime as number)) / 1000; // time in seconds

    if (timeTaken <= 300) {
      // less or equals 5 minutes: 2 money-bags
      this.collectedWallets = this.maxWallets;
    } else if (timeTaken <= 360) {
      // less or equals to 6 minutes : 1 money-bag
      this.collectedWallets = this.maxWallets / 2;
    } else {
      // more than 6 minutes : 1 ribbon
      this.collectedRibbons = 1;
    }

    this.isTaskCompleted = true;

    await this.saveResults();
    this.router.navigate(['/tabs/steps-exercise']);
  }

  private startTimer() {
    this.startTime = new Date().getTime();
  }

  private async saveResults() {
    // Implement logic to save results, e.g., to a JSON file or a database
  }

  // Done Button
  doneButton() {
    // Stop watching the position when done
    if (this.watchPositionId) {
      Geolocation.clearWatch({ id: this.watchPositionId });
    }

    this.router.navigate(['/tabs/steps-exercise']);
  }
}
