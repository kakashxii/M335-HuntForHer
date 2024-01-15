import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-past-hunts',
  templateUrl: './past-hunts.page.html',
  styleUrls: ['./past-hunts.page.scss'],
})
export class PastHuntsPage implements OnInit {
  pastHunts: any[] = [];

  constructor() { }

  ngOnInit() {
    this.loadAllPastHunts();
  }

  loadAllPastHunts() {
    // Retrieve all past hunts from local storage
    const allPastHuntsJson = localStorage.getItem('allPastHunts');

    if (allPastHuntsJson) {
      this.pastHunts = JSON.parse(allPastHuntsJson);
      console.log('All Past Hunts:', this.pastHunts); // Log to check if data is retrieved
    }
  }
}
