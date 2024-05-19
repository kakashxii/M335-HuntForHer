import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-past-hunts',
  templateUrl: './past-hunts.page.html',
  styleUrls: ['./past-hunts.page.scss'],
})
export class PastHuntsPage implements OnInit {
  pastHunts: any[] = [];

  constructor() {}

  ngOnInit() {
    this.loadAllPastHunts();
  }

  loadAllPastHunts() {
    const allPastHuntsJson = localStorage.getItem('allPastHunts');

    if (allPastHuntsJson) {
      this.pastHunts = JSON.parse(allPastHuntsJson);
    }
  }
}
