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

      // Iterate through past hunts and load rewards
      this.pastHunts.forEach((pastHunt) => {
        pastHunt.rewards = this.getTotalCollectedRewards(pastHunt);
      });
    }
  }

  getTotalCollectedRewards(pastHunt: any) {
    // Retrieve rewards for the specific past hunt
    console.log("past hunt: ", pastHunt)
    const rewardsKey = this.getRewardsKeyForExercise(pastHunt.rewards);
    console.log("rewardsKey: ", rewardsKey)
    const rewardsJson = localStorage.getItem(rewardsKey);
    console.log("rewardsJson: ", rewardsJson)

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

  private getRewardsKeyForExercise(reward: string): string {
    // Define the storage key for each reward type
    switch (reward) {
      case 'steps-exercise':
        return 'allStepsRewards';
      case 'pingpong-exercise':
        return 'allPingPongRewards';
      case 'qrcode-exercise':
        return 'allQRCodeRewards';
      case 'exercise-wlan':
        return 'allQRCodeRewards';
      case 'exercise-turnphone':
        return 'allQRCodeRewards';
      case 'load-exercise':
        return 'allQRCodeRewards';

      // Add more cases for other reward types if needed
      default:
        return 'unknownRewards';
    }
  }
}
