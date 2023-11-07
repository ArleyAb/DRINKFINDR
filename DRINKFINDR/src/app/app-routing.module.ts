import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

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
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(() => redirectLoggedInTo(['home']))
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    ...canActivate(() => redirectLoggedInTo(['home']))
  },
  {
    path: 'resena',
    loadChildren: () => import('./resena/resena.module').then( m => m.ResenaPageModule),
    ...canActivate(() => redirectUnauthorizedTo(['login']))
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./facultad/facultad.module').then( m => m.FacultadPageModule)
  },
  {
    path: 'bebederos',
    loadChildren: () => import('./bebederos/bebederos.module').then( m => m.BebederosPageModule)
  },
  {
    path: 'bebedero/:id',
    loadChildren: () => import('./bebedero/bebedero.module').then( m => m.BebederoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
