import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BebederoPage } from './bebedero.page';

const routes: Routes = [
  {
    path: '',
    component: BebederoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BebederoPageRoutingModule {}
