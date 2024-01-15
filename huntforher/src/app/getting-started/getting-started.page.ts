import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.page.html',
  styleUrls: ['./getting-started.page.scss'],
})
export class GettingStartedPage {

  name: string = '';

  constructor(private alertController: AlertController, private router: Router) { }

  async startGame() {
    const alert = await this.alertController.create({
      header: 'Please enter your info',
      buttons: [
        {
          text: 'OK',
          handler: (data) => {
            // Handle data if needed
            this.navigateToSettings(); // Call the method to navigate to the Settings page
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

  // Method to navigate to the Settings page
   navigateToSettings() {
     this.router.navigate(['./tabs/settings']).then(
       () => {
         console.log('Navigation to Introduction Page successful');
       },
       (error) => {
         console.error('Navigation to Introduction Page failed')

       }
     )}
   }
