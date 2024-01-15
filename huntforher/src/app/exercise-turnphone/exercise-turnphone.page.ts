import { Motion, OrientationListenerEvent } from '@capacitor/motion';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-turnphone',
  templateUrl: './exercise-turnphone.page.html',
  styleUrls: ['./exercise-turnphone.page.scss'],
})
export class ExerciseTurnphonePage implements OnInit {
  isHeadTurned: boolean = false;
  isNextButtonEnabled: boolean = false;

  constructor() { }

  ngOnInit() {
    this.startOrientationListener();
  }

  startOrientationListener() {
    Motion.addListener('orientation', (event: OrientationListenerEvent) => {
      // Überwache die Ausrichtung des Geräts
      const isUpsideDown = event.gamma > 170 || event.gamma < -170;

      if (isUpsideDown) {
        // Das Gerät ist auf den Kopf gedreht
        this.isHeadTurned = true;
        this.isNextButtonEnabled = true; // Aktiviere den Next-Button
        // Hier kannst du weitere Aktionen ausführen, wenn das Gerät auf den Kopf gedreht wurde
      } else {
        // Das Gerät ist nicht auf den Kopf gedreht
        this.isHeadTurned = false;
        this.isNextButtonEnabled = false; // Deaktiviere den Next-Button
      }
    });
  }
}
