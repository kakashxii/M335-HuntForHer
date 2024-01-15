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
    // Retrieve all past hunts from local storage
    const allPastHuntsJson = localStorage.getItem('allPastHunts');

    if (allPastHuntsJson) {
      this.pastHunts = JSON.parse(allPastHuntsJson);
      console.log('All Past Hunts:', this.pastHunts); // Log to check if data is retrieved
    }
  }

  getTotalCollectedRewards(pastHunt: any) {
    // Retrieve rewards for the specific past hunt
    const rewardsKey = this.getRewardsKeyForExercise(pastHunt.exerciseType);
    const rewardsJson = localStorage.getItem(rewardsKey);

    if (rewardsJson) {
      const rewards = JSON.parse(rewardsJson);
      const matchingReward = rewards.find((reward: any) => reward.dateTime === pastHunt.dateTime);

      if (matchingReward) {
        return {
          collectedWallets: matchingReward.collectedWallets || 0,
          collectedRibbons: matchingReward.collectedRibbons || 0,
        };
      }
    }

    return {
      collectedWallets: 0,
      collectedRibbons: 0,
    };
  }

  private getRewardsKeyForExercise(exerciseType: string): string {
    // Define the storage key for each exercise type
    switch (exerciseType) {
      case 'steps':
        return 'allStepsRewards';
      case 'pingpong':
        return 'allPingPongRewards';
      case 'qrcode':
        return 'allQRCodeRewards';
      // Add more cases for other exercise types if needed
      default:
        return 'unknownRewards';
    }
  }
}
