<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 887c80b87f444c65766b5437eb868e878591e94b
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
<<<<<<< HEAD
  },
  {
  path: 'playing-rules',
  loadChildren: () => import('./playing-rules/playing-rules.module').then( m => m.PlayingRulesPageModule)
},

  {
=======
  },{
>>>>>>> 887c80b87f444c65766b5437eb868e878591e94b
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'past-hunts',
    loadChildren: () => import('./past-hunts/past-hunts.module').then( m => m.PastHuntsPageModule)
  },  {
<<<<<<< HEAD
    path: 'getting-started',
    loadChildren: () => import('./getting-started/getting-started.module').then( m => m.GettingStartedPageModule)
=======
    path: 'playing-rules',
    loadChildren: () => import('./playing-rules/playing-rules.module').then( m => m.PlayingRulesPageModule)
=======
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
  {
  path: 'playing-rules',
  loadChildren: () => import('./playing-rules/playing-rules.module').then( m => m.PlayingRulesPageModule)
},

  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'past-hunts',
    loadChildren: () => import('./past-hunts/past-hunts.module').then( m => m.PastHuntsPageModule)
>>>>>>> 4c243c2791ba1c07f0ef02ae4f54819df4e152e6
>>>>>>> 887c80b87f444c65766b5437eb868e878591e94b
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
