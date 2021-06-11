import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'repos'
  },
  {
    path: 'repos',
    loadChildren: () => import('./modules/repos/repos.module').then(m => m.ReposModule)
  },
  {
    path: 'commits',
    loadChildren: () => import('./modules/commits/commits.module').then(m => m.CommitsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
