import { Component, OnInit } from '@angular/core';
import { Geolocation, PositionOptions, Position } from '@capacitor/geolocation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-steps-exercise',
  templateUrl: './steps-exercise.page.html',
  styleUrls: ['./steps-exercise.page.scss'],
})
export class StepsExercisePage implements OnInit {
  private startPosition: Position | null = null;
  private startTime: number | null = null;
  public distanceTraveled: number = 0;
  public timeTaken: number = 0;
  private watchId: string | undefined;

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.startExercise();
  }

  async startExercise() {
    // Get initial position
    const position = await Geolocation.getCurrentPosition();
    if (position) {
      this.startPosition = position;
      this.startTime = new Date().getTime();

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
    }
  }

  toRad(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  stopExercise() {
    // Stop watching position changes
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
    }

    // Calculate time taken
    if (this.startTime) {
      const endTime = new Date().getTime();
      this.timeTaken = (endTime - this.startTime) / 1000; // Convert to seconds

      // You can navigate to another page or perform further actions here
      this.router.navigate(['/tabs/qrcode-exercise'], {
        state: {
          distanceTraveled: this.distanceTraveled,
          timeTaken: this.timeTaken,
        },
      });
    }
  }
}
