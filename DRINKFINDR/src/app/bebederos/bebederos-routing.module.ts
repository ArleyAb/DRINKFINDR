import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BebederosPage } from './bebederos.page';

const routes: Routes = [
  {
    path: '',
    component: BebederosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BebederosPageRoutingModule {}
