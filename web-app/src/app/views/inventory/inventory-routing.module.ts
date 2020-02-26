import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { InventoryAreasComponent } from './inventory-areas/inventory-areas.component';
import { InventoryBuildingsComponent } from './inventory-buildings/inventory-buildings.component';
import { InventoryRacksComponent } from './inventory-racks/inventory-racks.component';
import { InventoryRackSwitchesComponent } from './inventory-rack-switches/inventory-rack-switches.component';
import { InventoryServersComponent } from './inventory-servers/inventory-servers.component';
import { InventoryCpusComponent } from './inventory-cpus/inventory-cpus.component';
import { InventoryMemoriesComponent } from './inventory-memories/inventory-memories.component';
import { InventoryAcceleratorsComponent } from './inventory-accelerators/inventory-accelerators.component';
import { InventoryPsusComponent } from './inventory-psus/inventory-psus.component';
import { InventoryServerCoolingsComponent } from './inventory-server-coolings/inventory-server-coolings.component';

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
    path: 'rack_switches/:id',
    component: InventoryRackSwitchesComponent,
    data: {
      title: 'Inventory / Rack Switches'
    }
  },
  {
    path: 'rack_pdus/:id',
    component: InventoryRackSwitchesComponent,
    data: {
      title: 'Inventory / Rack PDUs'
    }
  },
  {
    path: 'servers/:id',
    component: InventoryServersComponent,
    data: {
      title: 'Inventory / Servers'
    }
  },
  {
    path: 'cpus/:id',
    component: InventoryCpusComponent,
    data: {
      title: 'Inventory / CPUs'
    }
  },
  {
    path: 'memories/:id',
    component: InventoryMemoriesComponent,
    data: {
      title: 'Inventory / Memory Modules'
    }
  },
  {
    path: 'accelerators/:id',
    component: InventoryAcceleratorsComponent,
    data: {
      title: 'Inventory / Accelerators'
    }
  },
  {
    path: 'psus/:id',
    component: InventoryPsusComponent,
    data: {
      title: 'Inventory / PSUs'
    }
  },
  {
    path: 'server_coolings/:id',
    component: InventoryServerCoolingsComponent,
    data: {
      title: 'Inventory / Server Coolings'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {}
