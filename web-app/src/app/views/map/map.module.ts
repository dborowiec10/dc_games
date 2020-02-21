import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AreaPopupComponent } from './area-popup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MapRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    LeafletModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [],
  declarations: [ MapComponent, AreaPopupComponent ],
  entryComponents: [ AreaPopupComponent ]
})
export class MapModule {}
