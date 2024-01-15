import { Network, ConnectionStatus } from '@capacitor/network';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-wlan',
  templateUrl: './exercise-wlan.page.html',
  styleUrls: ['./exercise-wlan.page.scss'],
})
export class ExerciseWlanPage implements OnInit {
  isWifiConnected: boolean = false;
  isNextButtonEnabled: boolean = false;

  constructor() { }

  ngOnInit() {
    this.startNetworkListener();
  }

  async startNetworkListener() {
    const status = await Network.getStatus();

    // Überprüfe den aktuellen Netzwerkstatus
    this.updateNetworkStatus(status);

    // Füge einen Listener hinzu, um auf Netzwerkänderungen zu reagieren
    Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
      this.updateNetworkStatus(status);
    });
  }

  updateNetworkStatus(status: ConnectionStatus) {
    // Überwache den Netzwerkstatus und setze die Variable entsprechend
    this.isWifiConnected = status.connected && status.connectionType === 'wifi';
    this.isNextButtonEnabled = this.isWifiConnected;
  }
}
