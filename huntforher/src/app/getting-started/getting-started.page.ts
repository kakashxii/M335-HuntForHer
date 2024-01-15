import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.page.html',
  styleUrls: ['./getting-started.page.scss'],
})
export class GettingStartedPage implements OnInit {

  name: string = '';

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    // Hier kannst du Initialisierungen vornehmen, wenn nötig
  }

  async startGame() {
    const alert = await this.alertController.create({
      header: 'Please enter your info',
      buttons: [
        {
          text: 'OK',
          handler: (data) => {
            // Handle data if needed
            this.navigateToSettings();
          }
        }
      ],
      inputs: [
        { name: 'name', placeholder: 'Name' },
        // Other inputs if needed
      ],
    });

    await alert.present();
  }

  navigateToSettings() {
    this.router.navigate(['./tabs/settings']).then(
      () => {
        console.log('Navigation to Settings Page successful');
      },
      (error) => {
        console.error('Navigation to Settings Page failed', error);
      }
    );
  }
}
