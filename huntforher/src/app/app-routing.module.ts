import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  */
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then( m => m.routes)
<<<<<<< HEAD
  },
  {
    path: 'load-exercise',
    loadChildren: () => import('./load-exercise/load-exercise.module').then( m => m.LoadExercisePageModule)
  },

=======
  },










>>>>>>> 5ba1f6d8e3367895ed401b277f72600709a0abe9
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
