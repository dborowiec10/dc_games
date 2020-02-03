import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatacentersComponent } from './datacenters.component';

const routes: Routes = [
  {
    path: '',
    component: DatacentersComponent,
    data: {
      title: 'Datacenters'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatacentersRoutingModule {}
