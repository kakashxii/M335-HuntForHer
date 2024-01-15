// qrcode-exercise.page.ts
import { Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcode-exercise',
  templateUrl: './qrcode-exercise.page.html',
  styleUrls: ['./qrcode-exercise.page.scss'],
})
export class QrcodeExercisePage implements OnDestroy {
  qrCodeString = "M335@ICT-BZ";
  scannedResult: any;

  constructor(private router: Router) {} // Inject Router here

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
      const result = await BarcodeScanner.startScan();
      console.log(result);

      if (result.hasContent) {
        this.scannedResult = result.content;
        await BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
        console.log(this.scannedResult);
      } else {
        console.warn('Scan canceled or no content found.');
      }
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
    this.router.navigate(['/tabs/exercise-turnphone']);
  }
}
