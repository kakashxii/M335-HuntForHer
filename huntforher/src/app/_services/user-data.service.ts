// user-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private allPastHuntsKey = 'allPastHunts';

  constructor() {}

  getAllPastHunts(): any[] {
    const allPastHuntsJson = localStorage.getItem(this.allPastHuntsKey);
    return allPastHuntsJson ? JSON.parse(allPastHuntsJson) : [];
  }

  addPastHunt(name: string, rewards: string = '') {
    const userData = {
      name: name,
      dateTime: new Date().toISOString(),
      rewards: rewards,
    };

    const allPastHunts = this.getAllPastHunts();
    allPastHunts.push(userData);
    localStorage.setItem(this.allPastHuntsKey, JSON.stringify(allPastHunts));

    return allPastHunts.length - 1;
  }

  savePastHunts(allPastHunts: any[]) {
    localStorage.setItem(this.allPastHuntsKey, JSON.stringify(allPastHunts));
  }
}
