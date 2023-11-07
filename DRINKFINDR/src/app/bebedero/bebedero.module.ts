import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BebederoPageRoutingModule } from './bebedero-routing.module';

import { BebederoPage } from './bebedero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BebederoPageRoutingModule
  ],
  declarations: [BebederoPage]
})
export class BebederoPageModule {}
