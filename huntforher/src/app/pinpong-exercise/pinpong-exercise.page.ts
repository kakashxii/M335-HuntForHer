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

  doneButton() {
    // Stop watching the position when done
    if (this.watchPositionId) {
      Geolocation.clearWatch({ id: this.watchPositionId });
    }

    this.router.navigate(['/tabs/steps-exercise']);
  }
}
