import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load-exercise',
  templateUrl: './load-exercise.page.html',
  styleUrls: ['./load-exercise.page.scss'],
})
export class LoadExercisePage implements OnInit {
  public deviceInfo: any; // You can define the type based on the expected data structure

  constructor(private router: Router) {}

  ngOnInit() {
    this.logDeviceInfo();
    this.logBatteryInfo();
  }

  async logDeviceInfo() {
    this.deviceInfo = await Device.getInfo();
    console.log('Device Info:', this.deviceInfo);
  }

  async logBatteryInfo() {
    const batteryInfo = await Device.getBatteryInfo();
    console.log('Battery Info:', batteryInfo);
  }

  // Add any other methods or logic you need

  goToNextPage() {
    // Navigate to the next page
    this.router.navigate(['/next-page']);
  }
}
