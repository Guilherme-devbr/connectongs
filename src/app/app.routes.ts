import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'sobre-nos',
    loadComponent: () => import('./sobre-nos/sobre-nos.page').then(m => m.SobreNosPage)
  },

  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'recuperar',
    loadComponent: () => import('./recuperar/recuperar.page').then( m => m.RecuperarPage)
  },
  {
    path: 'ong',
    loadComponent: () => import('./ong/ong.page').then( m => m.OngPage)
  },
  {
    path: 'apis',
    loadComponent: () => import('./apis/apis.page').then( m => m.APISPage)
  },


];
