import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampanhaPageRoutingModule } from './campanha-routing.module';

import { CampanhaPage } from './campanha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampanhaPageRoutingModule
  ],
  declarations: [CampanhaPage]
})
export class CampanhaPageModule {}
