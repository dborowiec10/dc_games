import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { InventoryAreasComponent } from './inventory-areas/inventory-areas.component';
import { InventoryBuildingsComponent } from './inventory-buildings/inventory-buildings.component';
import { InventoryRacksComponent } from './inventory-racks/inventory-racks.component';
import { InventoryServersComponent } from './inventory-servers/inventory-servers.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    data: {
      title: 'Inventory'
    }
  },
  {
    path: 'areas/:id',
    component: InventoryAreasComponent,
    data: {
      title: 'Inventory / Areas'
    }
  },
  {
    path: 'buildings/:id',
    component: InventoryBuildingsComponent,
    data: {
      title: 'Inventory / Buildings'
    }
  },
  {
    path: 'racks/:id',
    component: InventoryRacksComponent,
    data: {
      title: 'Inventory / Racks'
    }
  },
  {
    path: 'servers/:id',
    component: InventoryServersComponent,
    data: {
      title: 'Inventory / Servers'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {}
