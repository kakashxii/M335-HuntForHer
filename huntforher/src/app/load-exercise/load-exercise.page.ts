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
  public collectedWallets: number = 0;
  public collectedRibbons: number = 0;
  private maxWallets: number = 6; // amount of money-bags that can be collected
  private maxRibbons: number = 5; // amount of ribbons that can be collected

  constructor(private router: Router) {}

  ngOnInit() {
    // Log device information when the page initializes
    this.logDeviceInfo();
    // Log battery information and check every 5 seconds if the phone is charging
    this.logBatteryInfo();
    this.chargingCheckInterval = setInterval(() => {
      this.logBatteryInfo();
    }, 5000);
  }

  ngOnDestroy() {
    // Stop the periodic battery check when leaving the page
    clearInterval(this.chargingCheckInterval);
  }

  async logDeviceInfo() {
    // Retrieve and log device information
    this.deviceInfo = await Device.getInfo();
    console.log('Device Info:', this.deviceInfo);
  }

  async logBatteryInfo() {
    // Retrieve and log battery information
    const batteryInfo = await Device.getBatteryInfo();
    console.log('Battery Info:', batteryInfo);
    // Update the charging status based on battery information
    this.isCharging = batteryInfo.isCharging || false;

    // Apply rewards based on charging status
    if (this.isCharging) {
      // less or equals to 5 minutes: 6 money-bags
      this.collectedWallets = this.maxWallets;
    } else {
      // more than 5 minutes: 5 ribbons
      this.collectedRibbons = this.maxRibbons;
    }
  }

  goToNextPage() {
    // Navigate to the next page only if the phone is charging
    if (this.isCharging) {
      // Store collected rewards in local storage or send to the leaderboard API as needed
      this.storeCollectedRewards();

      // Navigate to the next page
      this.router.navigate(['/tabs/exercise-wlan']);
    } else {
      // Display a message to the user or handle the case when the phone is not charging
      console.log('Connect your phone to the charger before proceeding.');
    }
  }

  // Store collected rewards in local storage or send to the leaderboard API as needed
  storeCollectedRewards() {
    const currentDate = new Date();
    const dateTime = currentDate.toISOString();

    const rewardsData = {
      collectedWallets: this.collectedWallets,
      collectedRibbons: this.collectedRibbons,
      dateTime: dateTime
    };

    // Retrieve existing rewards from local storage
    const allLoadExerciseRewardsJson = localStorage.getItem('allLoadExerciseRewards');
    let allLoadExerciseRewards: any[] = [];

    if (allLoadExerciseRewardsJson) {
      allLoadExerciseRewards = JSON.parse(allLoadExerciseRewardsJson);
    }

    // Append the new rewards data to the array
    allLoadExerciseRewards.push(rewardsData);

    // Store the updated rewards array in local storage
    localStorage.setItem('allLoadExerciseRewards', JSON.stringify(allLoadExerciseRewards));
  }
}
