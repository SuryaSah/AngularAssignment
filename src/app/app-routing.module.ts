import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapRemarkComponent } from './mapRemark';

const routes: Routes = [
    { path: '', redirectTo: '/map', pathMatch: 'full' },
    { path: 'map', component: MapRemarkComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
