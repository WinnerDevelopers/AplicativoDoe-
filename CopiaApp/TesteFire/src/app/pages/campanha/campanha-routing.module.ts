import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampanhaPage } from './campanha.page';

const routes: Routes = [
  {
    path: '',
    component: CampanhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampanhaPageRoutingModule {}
