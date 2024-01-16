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
  expectedQRCodeContent: string = 'your_expected_content'; // Replace with your expected QR code content
  private startTime: number | null = null;
  private endTime: number | null = null;
  private isTaskCompleted: boolean = false;
  public collectedWallets: number = 0;
  public collectedRibbons: number = 0;
  private maxWallets: number = 4;
  private maxRibbons: number = 3;

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

        if (this.scannedResult === this.expectedQRCodeContent) {
          await BarcodeScanner.showBackground();
          document.querySelector('body')?.classList.remove('scanner-active');
          console.log(this.scannedResult);
        } else {
          console.warn('Incorrect QR Code content. Please scan the correct QR Code.');
          this.scannedResult = null;
          return;
        }
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
    if (this.isTaskCompleted && this.scannedResult === this.expectedQRCodeContent) {
      this.saveResults();
      this.router.navigate(['/tabs/exercise-turnphone']);
    } else {
      console.warn('Task is not completed or incorrect QR Code content.');
    }
  }

  private startTimer() {
    this.startTime = new Date().getTime();
  }

  private stopTimer() {
    this.endTime = new Date().getTime();
  }

  private async taskCompleted() {
    if (this.startTime && this.endTime) {
      const timeTaken = (this.endTime - this.startTime) / 1000;

      if (timeTaken <= 300) {
        this.collectedWallets = this.maxWallets;
      } else if (timeTaken <= 360) {
        this.collectedWallets = this.maxWallets / 2;
      } else {
        this.collectedRibbons = this.maxRibbons;
      }

      this.isTaskCompleted = true;
      this.saveResults();
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

    const allQRCodeRewardsJson = localStorage.getItem('allQRCodeRewards');
    let allQRCodeRewards: any[] = [];

    if (allQRCodeRewardsJson) {
      allQRCodeRewards = JSON.parse(allQRCodeRewardsJson);
    }

    allQRCodeRewards.push(rewardsData);
    localStorage.setItem('allQRCodeRewards', JSON.stringify(allQRCodeRewards));
  }
}
