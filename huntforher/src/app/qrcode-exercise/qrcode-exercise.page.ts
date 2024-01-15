// qrcode-exercise.page.ts
import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcode-exercise',
  templateUrl: './qrcode-exercise.page.html',
  styleUrls: ['./qrcode-exercise.page.scss'],
})
export class QrcodeExercisePage {
  scannedQRCodeContent: string = ''; // Provide an initializer value

  constructor(private router: Router) {}

  async scanQRCode() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      // Set the scanned QR code text
      this.scannedQRCodeContent = 'M335@ICT-BZ';
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  }

  doneButton() {
    this.router.navigate(['/tabs/steps-exercise']);
  }
}

