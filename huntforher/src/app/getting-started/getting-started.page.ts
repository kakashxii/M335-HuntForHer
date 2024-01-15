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

  constructor(private alertController: AlertController, private router: Router) {}

  ngOnInit() {
    // Hier kannst du Initialisierungen vornehmen, wenn nötig
  }

  async startGame() {
    const alert = await this.alertController.create({
      header: 'Please enter your name',
      buttons: [
        {
          text: 'OK',
          handler: (data) => {
            this.navigateToSettings(data.name); // Pass the name to the navigateToSettings method
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

  // Method to navigate to the Settings page and store name with date and time
  navigateToSettings(name: string) {
    const currentDate = new Date();
    const dateTime = currentDate.toISOString();

    const userData = {
      name: name,
      dateTime: dateTime
    };

    // Retrieve existing past hunts from local storage
    const allPastHuntsJson = localStorage.getItem('allPastHunts');
    let allPastHunts: any[] = [];

    if (allPastHuntsJson) {
      allPastHunts = JSON.parse(allPastHuntsJson);
    }

    // Append the new user data to the array
    allPastHunts.push(userData);

    // Store the updated past hunts array in local storage
    localStorage.setItem('allPastHunts', JSON.stringify(allPastHunts));

    // Navigate to the Settings page
    this.navigateToSettingsPage();
  }

  navigateToSettingsPage() {
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
