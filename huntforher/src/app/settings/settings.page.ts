// settings.page.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';
import { Camera } from '@capacitor/camera';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {
  locationPermissionGranted: boolean = false;
  cameraPermissionGranted: boolean = false;
  startButtonEnabled: boolean = false;
  private intervalSubscription: Subscription | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    // Perform the initial permission check when the component is initialized
    this.checkLocationPermission();
    this.checkCameraPermission();

    // Set up an interval to periodically check permissions
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.checkLocationPermission();
      this.checkCameraPermission();
    });
  }

  ngOnDestroy() {
    // Unsubscribe from the interval when the component is destroyed
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  async updateStartButtonState() {
    // Enable the button only if both location and camera permissions are granted
    this.startButtonEnabled = this.locationPermissionGranted && this.cameraPermissionGranted;
  }

  async checkLocationPermission() {
    try {
      const permissionStatus = await Geolocation.checkPermissions();
      console.log('Location permission status:', permissionStatus.location);

      if (permissionStatus?.location !== 'granted') {
        const requestStatus = await Geolocation.requestPermissions();

        if (requestStatus.location !== 'granted') {
          // Go to location settings
          this.locationPermissionGranted = false;
        } else {
          this.locationPermissionGranted = true;
        }
      } else {
        this.locationPermissionGranted = true;
      }

      this.updateStartButtonState();
    } catch (e) {
      console.error('Error checking location permission:', e);
    }
  }

  async checkCameraPermission() {
    try {
      const cameraPermissionStatus = await Camera.checkPermissions();
      console.log('Camera permission status:', cameraPermissionStatus.camera);

      if (cameraPermissionStatus?.camera !== 'granted') {
        const requestStatus = await Camera.requestPermissions();

        if (requestStatus.camera !== 'granted') {
          // Go to camera settings
          this.cameraPermissionGranted = false;
        } else {
          this.cameraPermissionGranted = true;
        }
      } else {
        this.cameraPermissionGranted = true;
      }

      this.updateStartButtonState();
    } catch (e) {
      console.error('Error checking camera permission:', e);
    }
  }

  startGame() {
    if (this.startButtonEnabled) {
      this.router.navigate(['/tabs/pinpong-exercise']);
    }
  }
}
