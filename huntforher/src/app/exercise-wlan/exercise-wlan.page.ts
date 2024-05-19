import { Network, ConnectionStatus } from '@capacitor/network';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-exercise-wlan',
  templateUrl: './exercise-wlan.page.html',
  styleUrls: ['./exercise-wlan.page.scss'],
})
export class ExerciseWlanPage implements OnInit {
  isWifiConnected: boolean = false;
  isNextButtonEnabled: boolean = false;
  private wifiCheckInterval: any;
  private startTime: number | null = null;
  private endTime: number | null = null;
  public collectedWallets: number = 0;
  public collectedRibbons: number = 0;
  private maxWallets: number = 7; // amount of money-bags that can be collected
  private maxRibbons: number = 6; // amount of ribbons that can be collected

  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.startNetworkListener();

    // Check every 5 seconds whether the device is connected to Wi-Fi
    this.wifiCheckInterval = setInterval(() => {
      this.checkWifiConnection();
    }, 5000);
  }

  ngOnDestroy() {
    // Stop the periodic check when leaving the page
    clearInterval(this.wifiCheckInterval);
  }

  async startNetworkListener() {
    const status = await Network.getStatus();

    // Check the current network status
    this.updateNetworkStatus(status);

    // Add a listener to react to network changes
    Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
      this.updateNetworkStatus(status);
    });
  }

  updateNetworkStatus(status: ConnectionStatus) {
    // Monitor the network status and set the variable accordingly
    this.isWifiConnected = status.connected && status.connectionType === 'wifi';
    this.isNextButtonEnabled = this.isWifiConnected;
  }

  checkWifiConnection() {
    // Check the Wi-Fi connection every 5 seconds
    const status = Network.getStatus().then((status: ConnectionStatus) => {
      this.updateNetworkStatus(status);
    });
  }

  doneButton() {
    // Stop the periodic check when leaving the page
    clearInterval(this.wifiCheckInterval);

    // Start the exercise and timer when the user clicks the "Finish hunting" button
    this.startExercise();
  }

  // Function to update rewards based on time elapsed
  updateRewards() {
    // Calculate time taken for the exercise
    this.endTime = new Date().getTime();
    const timeTaken = ((this.endTime as number) - (this.startTime as number)) / 1000; // time in seconds

    // Apply rewards based on time
    if (timeTaken <= 300) {
      // less or equals 5 minutes: 7 money-bags
      this.collectedWallets = this.maxWallets;
    } else if (timeTaken <= 360) {
      // less or equals to 6 minutes : 3 money-bags
      this.collectedWallets = this.maxWallets / 2;
    } else {
      // more than 6 minutes : 6 ribbons
      this.collectedRibbons = 6;
    }

    // Optionally, you can store the updated rewards in local storage or send to the leaderboard API
    // this.storeCollectedRewards();

    // Navigate to the next page or perform other actions as needed
    this.router.navigate(['/tabs/post-hunts']);
  }

  // Start the exercise and timer
  startExercise() {
    this.startTime = new Date().getTime();
    const timerInterval = setInterval(() => {
      this.updateRewards();
      clearInterval(timerInterval); // Stop the timer after updating rewards
    }, 1000);

    // Ensure Change Detection is triggered to update the UI
    this.cdr.detectChanges();
  }
}
