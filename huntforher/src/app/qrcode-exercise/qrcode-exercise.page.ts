import { Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcode-exercise',
  templateUrl: './qrcode-exercise.page.html',
  styleUrls: ['./qrcode-exercise.page.scss'],
})
export class QrcodeExercisePage implements OnDestroy {
  scannedResult: any;
  private startTime: number | null = null;
  private endTime: number | null = null;
  private isTaskCompleted: boolean = false;
  public collectedWallets: number = 0;
  public collectedRibbons: number = 0;
  private maxWallets: number = 4; // Increase the maxWallets to 4 for this exercise
  private maxRibbons: number = 3; // Set the maxRibbons to 3 for this exercise

  constructor(private router: Router) {}

  async checkPermission() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    return status.granted;
  }

  catchError(error: any) {
    console.error(error);
  }

  async scanQRCode() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }

      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.startTimer();
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scannedResult = result.content;
        await BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
        console.log(this.scannedResult);
      } else {
        console.warn('Scan canceled or no content found.');
      }

      this.stopTimer();
      await this.taskCompleted();
    } catch (error) {
      this.catchError(error);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
  }

  ngOnDestroy() {
    this.stopScan();
  }

  doneButton() {
    this.saveResults(); // Save results before navigating
    this.router.navigate(['/tabs/exercise-turnphone']);
  }

  private startTimer() {
    this.startTime = new Date().getTime();
  }

  private stopTimer() {
    this.endTime = new Date().getTime();
  }

  private async taskCompleted() {
    if (this.startTime && this.endTime) {
      const timeTaken = (this.endTime - this.startTime) / 1000; // time in seconds

      // Your reward logic based on time taken
      if (timeTaken <= 300) {
        // less or equals 5 minutes: 4 money-bags
        this.collectedWallets = this.maxWallets;
      } else if (timeTaken <= 360) {
        // less or equals to 6 minutes: 2 money-bags
        this.collectedWallets = this.maxWallets / 2;
      } else {
        // more than 6 minutes: 3 ribbons
        this.collectedRibbons = this.maxRibbons;
      }

      this.isTaskCompleted = true;
      this.saveResults(); // Save results when the task is completed
    }
  }

  private saveResults() {
    const currentDate = new Date();
    const dateTime = currentDate.toISOString();

    const rewardsData = {
      collectedWallets: this.collectedWallets,
      collectedRibbons: this.collectedRibbons,
      dateTime: dateTime
    };

    // Retrieve existing rewards from local storage
    const allQRCodeRewardsJson = localStorage.getItem('allQRCodeRewards');
    let allQRCodeRewards: any[] = [];

    if (allQRCodeRewardsJson) {
      allQRCodeRewards = JSON.parse(allQRCodeRewardsJson);
    }

    // Append the new rewards data to the array
    allQRCodeRewards.push(rewardsData);

    // Store the updated rewards array in local storage
    localStorage.setItem('allQRCodeRewards', JSON.stringify(allQRCodeRewards));
  }
}
6
