import { Network, ConnectionStatus } from '@capacitor/network';
import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router) { }

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
    this.router.navigate(['/tabs/past-hunts']);
  }
}
