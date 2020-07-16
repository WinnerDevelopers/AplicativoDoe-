import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampanhaPageRoutingModule } from './campanha-routing.module';

import { CampanhaPage } from './campanha.page';

import { ModalCampanhaComponent } from '../modal-campanha/modal-campanha.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampanhaPageRoutingModule
  ],
  declarations: [CampanhaPage, ModalCampanhaComponent],
  entryComponents: [ModalCampanhaComponent]
})
export class CampanhaPageModule {}
