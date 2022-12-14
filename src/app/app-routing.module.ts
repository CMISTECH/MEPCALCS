import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'console',
    pathMatch: 'full'
  },
  {
    path: 'console',
    loadChildren:() => import('./console/console.module').then(m => m.ConsoleModule)    
  },
  {
    path: 'account',
    loadChildren:() => import('./account/account.module').then(m => m.AccountModule)
  },
  { 
    path: '**', 
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
