import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InventoryAreasComponent } from './inventory-areas/inventory-areas.component';
import { InventoryBuildingsComponent } from './inventory-buildings/inventory-buildings.component';
import { InventoryRacksComponent } from './inventory-racks/inventory-racks.component';
import { InventoryRackSwitchesComponent } from './inventory-rack-switches/inventory-rack-switches.component';
import { InventoryRackPdusComponent } from './inventory-rack-pdus/inventory-rack-pdus.component';
import { InventoryServersComponent } from './inventory-servers/inventory-servers.component';
import { InventoryCpusComponent } from './inventory-cpus/inventory-cpus.component';
import { InventoryMemoriesComponent } from './inventory-memories/inventory-memories.component';
import { InventoryAcceleratorsComponent } from './inventory-accelerators/inventory-accelerators.component';
import { InventoryPsusComponent } from './inventory-psus/inventory-psus.component';
import { InventoryServerCoolingsComponent } from './inventory-server-coolings/inventory-server-coolings.component';

@NgModule({
  imports: [
    FormsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    InventoryRoutingModule,
    TabsModule,
    ModalModule.forRoot(),
    CommonModule
  ],
  declarations: [
    InventoryComponent,
    InventoryAreasComponent,
    InventoryBuildingsComponent,
    InventoryRacksComponent,
    InventoryRackSwitchesComponent,
    InventoryRackPdusComponent,
    InventoryServersComponent,
    InventoryCpusComponent,
    InventoryMemoriesComponent,
    InventoryAcceleratorsComponent,
    InventoryPsusComponent,
    InventoryServerCoolingsComponent
  ]
})
export class InventoryModule { }
