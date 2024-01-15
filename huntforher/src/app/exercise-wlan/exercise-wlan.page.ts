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

    // Überprüfe alle 5 Sekunden, ob das Gerät mit dem WLAN verbunden ist
    this.wifiCheckInterval = setInterval(() => {
      this.checkWifiConnection();
    }, 5000);
  }

  ngOnDestroy() {
    // Wenn die Seite verlassen wird, stoppe die Überprüfung
    clearInterval(this.wifiCheckInterval);
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

  checkWifiConnection() {
    // Überprüfe alle 5 Sekunden die WLAN-Verbindung
    const status = Network.getStatus().then((status: ConnectionStatus) => {
      this.updateNetworkStatus(status);
    });
  }

  doneButton() {
    // Stoppe die Überprüfung, wenn die Seite verlassen wird
    clearInterval(this.wifiCheckInterval);
    this.router.navigate(['/tabs/load-exercise']);
  }
}
