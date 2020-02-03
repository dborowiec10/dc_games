import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MarketplaceComponent } from './marketplace.component';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    FormsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    MarketplaceRoutingModule,
    TabsModule,
    ModalModule.forRoot(),
    CommonModule
  ],
  declarations: [
    MarketplaceComponent
  ]
})
export class MarketplaceModule { }
