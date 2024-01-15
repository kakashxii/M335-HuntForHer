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

  constructor() {}

  async checkPermission() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    return status.granted;
  }

  catch(e: any) {
    console.log(e);
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

      if (result?.hasContent) {
        this.scannedResult = result.content;
        BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
        console.log(this.scannedResult);
      }
    } catch (e) {
      console.log(e);
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
}
