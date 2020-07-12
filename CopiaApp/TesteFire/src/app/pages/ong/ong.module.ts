import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OngPageRoutingModule } from './ong-routing.module';

import { OngPage } from './ong.page';
import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OngPageRoutingModule
  ],
  declarations: [OngPage, DepositModalComponent],
  entryComponents: [DepositModalComponent]
})
export class OngPageModule {}
