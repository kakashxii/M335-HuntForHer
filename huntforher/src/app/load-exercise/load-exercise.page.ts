import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load-exercise',
  templateUrl: './load-exercise.page.html',
  styleUrls: ['./load-exercise.page.scss'],
})
export class LoadExercisePage implements OnInit {
  public deviceInfo: any;
  public isCharging: boolean = false;
  private chargingCheckInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.logDeviceInfo();
    this.logBatteryInfo();

    // Überprüfe alle 5 Sekunden, ob das Telefon aufgeladen wird
    this.chargingCheckInterval = setInterval(() => {
      this.logBatteryInfo();
    }, 5000);
  }

  ngOnDestroy() {
    // Wenn die Seite verlassen wird, stoppe die Überprüfung
    clearInterval(this.chargingCheckInterval);
  }

  async logDeviceInfo() {
    this.deviceInfo = await Device.getInfo();
    console.log('Device Info:', this.deviceInfo);
  }

  async logBatteryInfo() {
    const batteryInfo = await Device.getBatteryInfo();
    console.log('Battery Info:', batteryInfo);
    this.isCharging = batteryInfo.isCharging || false;
  }

  goToNextPage() {
    // Navigate to the next page only if the phone is charging
    if (this.isCharging) {
      this.router.navigate(['/tabs/exercise-wlan']);
    } else {
      // Display a message to the user or handle the case when the phone is not charging
      console.log('Connect your phone to the charger before proceeding.');
    }
  }
}
