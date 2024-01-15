import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-exercise-turnphone',
  templateUrl: './exercise-turnphone.page.html',
  styleUrls: ['./exercise-turnphone.page.scss'],
})
export class ExerciseTurnphonePage implements OnInit {
  isHeadTurned: boolean = false;
  isNextButtonEnabled: boolean = false;
  checkOrientationInterval: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.startOrientationListener();
    // Starte die periodische Überprüfung alle 3 Sekunden
    this.checkOrientationInterval = setInterval(() => {
      this.checkOrientation();
    }, 3000);
  }

  ngOnDestroy() {
    // Stopp das Interval, wenn die Komponente zerstört wird
    clearInterval(this.checkOrientationInterval);
  }

  startOrientationListener() {
    window.addEventListener('orientationchange', () => {
      console.log('Orientation changed');
      this.checkOrientation();
    });

    // Initial check when the page loads
    this.checkOrientation();
  }

  checkOrientation() {
    const isUpsideDown = window.matchMedia("(orientation: landscape)").matches;
    console.log('Is upside down:', isUpsideDown);

    if (isUpsideDown) {
      this.isHeadTurned = true;
      this.isNextButtonEnabled = true;
    } else {
      this.isHeadTurned = false;
      this.isNextButtonEnabled = false;
    }
  }

  doneButton() {
    // Füge hier weitere Aktionen hinzu, wenn der "Weiter"-Button geklickt wird
    this.router.navigate(['/tabs/load-exercise']);
  }
}
