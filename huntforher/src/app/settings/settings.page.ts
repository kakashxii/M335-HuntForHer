// settings.page.ts
import { Component } from '@angular/core';
import { Plugins, Capacitor } from '@capacitor/core';
import { AlertController, NavController } from '@ionic/angular';

const { Geolocation, Storage } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  cameraPermission = false;
  locationPermission = false;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  async startGame() {
    if (await this.checkPermissions()) {
      this.navigateToPingPongExercise();
    } else {
      this.showPermissionDeniedAlert();
    }
  }

  async checkPermissions() {
    // Check permissions for image storage
    const imagePermissionResult = await (Storage as any).requestPermissions();
    this.cameraPermission = imagePermissionResult.photos === 'granted';

    // Check permissions for geolocation
    if (Capacitor.isNative) {
      const geolocationPermissionResult = await (Geolocation as any).checkPermissions();
      this.locationPermission = geolocationPermissionResult.state === 'granted';
    } else {
      // Handle non-native environment (e.g., browser) as needed
      console.warn('Geolocation not supported in a non-native environment.');
      this.locationPermission = false;
    }

    return this.cameraPermission && this.locationPermission;
  }

  async showPermissionDeniedAlert() {
    const alert = await this.alertController.create({
      header: 'Permissions Required',
      message: 'Please grant the app the necessary permissions in the settings.',
      buttons: ['OK']
    });

    await alert.present();
  }

  navigateToPingPongExercise() {
    this.navCtrl.navigateForward('/tabs/pinpong-exercise');
  }
}
