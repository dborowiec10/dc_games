import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DatacentersComponent } from './datacenters.component';
import { DatacentersRoutingModule } from './datacenters-routing.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  imports: [
    FormsModule,
    DatacentersRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    Ng2GoogleChartsModule
  ],
  declarations: [ DatacentersComponent ]
})
export class DatacentersModule { }
