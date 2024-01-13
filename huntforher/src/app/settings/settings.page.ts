// settings.page.ts
import { Component } from '@angular/core';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';
import { Camera } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  locationPermissionGranted: boolean = false;
  cameraPermissionGranted: boolean = false;

  constructor(private router: Router) {}

  async checkLocationPermission() {
    try {
      const permissionStatus = await Geolocation.checkPermissions();
      console.log('Location permission status:', permissionStatus.location);

      if (permissionStatus?.location !== 'granted') {
        const requestStatus = await Geolocation.requestPermissions();

        if (requestStatus.location !== 'granted') {
          // Go to location settings
          this.locationPermissionGranted = false;
          return;
        }
      }

      this.locationPermissionGranted = true;
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
          return;
        }
      }

      this.cameraPermissionGranted = true;
    } catch (e) {
      console.error('Error checking camera permission:', e);
    }
  }

  startGame() {

    if (this.locationPermissionGranted && this.cameraPermissionGranted) {
      this.router.navigate(['/tabs/pinpong-exercise']);
    } else {
      console.log('Not all permissions granted. Game cannot be started.');
    }
  }
}
