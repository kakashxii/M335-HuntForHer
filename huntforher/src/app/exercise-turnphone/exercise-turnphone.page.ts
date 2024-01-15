import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-turnphone',
  templateUrl: './exercise-turnphone.page.html',
  styleUrls: ['./exercise-turnphone.page.scss'],
})
export class ExerciseTurnphonePage implements OnInit {

  roundTime: string = '00:00';
  totalTime: string = '00:00';
  isHeadTurned: boolean = false;
  isBackButtonEnabled: boolean = false;
  isNextButtonEnabled: boolean = false;

  constructor() { }

  ngOnInit() {
    // Hier kannst du Initialisierungslogik hinzufügen, falls erforderlich
  }

  // Funktion zum Aktualisieren der Gesamtzeit
  updateTotalTime(newTotalTime: string): void {
    this.totalTime = newTotalTime;
  }

  // Funktion zum Behandeln der Änderung des Checkbox-Zustands
  handleCheckboxChange(): void {
    // Implementiere hier deine Logik, wenn sich der Checkbox-Zustand ändert
    // Zum Beispiel die Aktualisierung von isNextButtonEnabled basierend auf dem Checkbox-Zustand
    this.isNextButtonEnabled = this.isHeadTurned;
  }

  // Funktion zum Behandeln des Klicks auf den Zurück-Button
  handleBackButtonClick(): void {
    // Implementiere hier deine Logik, wenn der Zurück-Button geklickt wird
    // Zum Beispiel die Navigation zur vorherigen Aufgabe/Seite
  }

  // Funktion zum Behandeln des Klicks auf den Weiter-Button
  handleNextButtonClick(): void {
    // Implementiere hier deine Logik, wenn der Weiter-Button geklickt wird
    // Zum Beispiel die Navigation zur nächsten Aufgabe/Seite
  }
}
