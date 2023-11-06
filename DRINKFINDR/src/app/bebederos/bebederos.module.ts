import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BebederosPageRoutingModule } from './bebederos-routing.module';

import { BebederosPage } from './bebederos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BebederosPageRoutingModule
  ],
  declarations: [BebederosPage]
})
export class BebederosPageModule {}
