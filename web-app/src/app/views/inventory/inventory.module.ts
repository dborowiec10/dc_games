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
import { InventoryServersComponent } from './inventory-servers/inventory-servers.component';

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
    InventoryServersComponent
  ]
})
export class InventoryModule { }
