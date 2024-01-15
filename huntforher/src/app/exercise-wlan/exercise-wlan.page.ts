import { Network, ConnectionStatus } from '@capacitor/network';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-exercise-wlan',
  templateUrl: './exercise-wlan.page.html',
  styleUrls: ['./exercise-wlan.page.scss'],
})
export class ExerciseWlanPage implements OnInit {
  isWifiConnected: boolean = false;
  isNextButtonEnabled: boolean = false;

  constructor(private router: Router) { }

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


  doneButton() {
    this.router.navigate(['/tabs/load-exercise']);
  }
}
