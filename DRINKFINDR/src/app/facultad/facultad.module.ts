import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacultadPageRoutingModule } from './facultad-routing.module';

import { FacultadPage } from './facultad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacultadPageRoutingModule
  ],
  declarations: [FacultadPage]
})
export class FacultadPageModule {}