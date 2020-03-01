import { ViewChild, AfterViewInit, Component, OnInit, ComponentFactoryResolver, Injector, AfterViewChecked, AfterContentChecked} from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from '../../api.service';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { AreaPopupComponent } from './area-popup.component';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../../state.service';

@Component({
  templateUrl: 'map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  public options = {
    layers: [
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	      maxZoom: 19
      })
    ],
    maxBounds: L.latLngBounds(L.latLng(-89.98155760646617, -180), L.latLng(89.99346179538875, 180)),
    maxBoundsViscosity: 1.0,
    zoom: 2,
    center: L.latLng(0, 0)
  };
  public areas = [];
  public map: L.Map;
  private area_id = null;

  @ViewChild(LeafletDirective) map_dir: LeafletDirective;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private _activRoute: ActivatedRoute,
    private state: StateService
  ) {}

  isCollapsed = {
    "areas": true,
    "datacenters": true
  };

  collapsed(event: any, tab: string): void {}

  expanded(event: any, tab: string): void {}

  viewArea(area) {
    this.map.fitBounds(area['layer'].getBounds());
    area['layer'].openPopup();
  }

  private init_areas() {
    this.state.getAreas(false).subscribe((res) => {
      for (var val of res['areas']) {
        const poly = new L.Polygon(val['coordinates']);
        const factory = this.resolver.resolveComponentFactory(AreaPopupComponent);
        const component = factory.create(this.injector);
        component.instance.name = val['name'];
        component.instance.sqmt = val['square_metres'];
        component.instance.owner = val['owner_id'];
        component.instance.average_temperature = val['average_temperature'];
        component.instance.price = val['price'];
        component.instance.status = val['status'];
        component.instance.id = val['id'];
        component.changeDetectorRef.detectChanges();
        poly.bindPopup(component.location.nativeElement);
        this.areas.push({
          'area': val,
          'layer': poly
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.map = this.map_dir.map;
    (async () => {
      await new Promise( resolve => setTimeout(resolve, 1000) );
      if(this.area_id !== null){
        for(let a of this.areas){
          if(a['area']['id'] === this.area_id){
            console.log(a);
            this.map.fitBounds(a['layer'].getBounds());
            a['layer'].openPopup();
            this.map.invalidateSize(false);
          }
        }
      }
    })();
  }

  ngOnInit() {
    this.init_areas();
    if(this._activRoute.firstChild !== null) {
      this._activRoute.firstChild.params.subscribe(
        (params: any) => {
          this.area_id = params['id'];
        }
      );
    }
  }

}
