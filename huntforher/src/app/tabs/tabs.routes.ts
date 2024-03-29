import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {PastHuntsPageModule} from "../past-hunts/past-hunts.module";

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import("./../home/home.module").then( m => m.HomePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import("./../settings/settings.module").then( m => m.SettingsPageModule)
      },
      {
        path: 'post-hunts',
        loadChildren: () => import("./../past-hunts/past-hunts.module").then( m => m.PastHuntsPageModule)
      },
      {
        path: 'intro',
        loadChildren: () => import('./../intro/intro.module').then(m => m.IntroPageModule)
      },
      {
        path: 'playing-rules',
        loadChildren: () => import('./../playing-rules/playing-rules.module').then(m => m.PlayingRulesPageModule)
      },
      {
        path: 'getting-started',
        loadChildren: () => import('./../getting-started/getting-started.module').then(m => m.GettingStartedPageModule)
      },
      {
        path: 'pinpong-exercise',
        loadChildren: () => import('./../pinpong-exercise/pinpong-exercise.module').then( m => m.PinpongExercisePageModule)
      },

      {
        path: 'steps-exercise',
        loadChildren: () => import('./../steps-exercise/steps-exercise.module').then( m => m.StepsExercisePageModule)
      },

      {
        path: 'exercise-wlan',
        loadChildren: () => import('./../exercise-wlan/exercise-wlan.module').then( m => m.ExerciseWlanPageModule)
      },
      {
        path: 'exercise-turnphone',
        loadChildren: () => import('./../exercise-turnphone/exercise-turnphone.module').then( m => m.ExerciseTurnphonePageModule)
      },
      {
        path: 'qrcode-exercise',
        loadChildren: () => import('./../qrcode-exercise/qrcode-exercise.module').then( m => m.QrcodeExercisePageModule)
      },
      {
        path: 'load-exercise',
        loadChildren: () => import('./../load-exercise/load-exercise.module').then( m => m.LoadExercisePageModule)
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
