import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit, AfterViewInit {

  constructor(
    private _apiSvc: ApiService,
    private _router: Router,
    private _activRoute: ActivatedRoute
  ){}

  public areas = [];
  public buildings = [];
  public racks = [];
  public rack_switches = [];

  private tab_id = 'areas';
  private other_id = null;

  public current_area = null;
  public current_building = null;
  public current_rack = null;
  public current_rack_switch = null;

  @ViewChild('tabs') tabs;
  @ViewChild('area_details_modal') public area_details_modal: ModalDirective;
  @ViewChild('area_purchase_modal') public area_purchase_modal: ModalDirective;

  @ViewChild('building_details_modal') public building_details_modal: ModalDirective;
  @ViewChild('building_purchase_modal') public building_purchase_modal: ModalDirective;

  @ViewChild('rack_details_modal') public rack_details_modal: ModalDirective;
  @ViewChild('rack_purchase_modal') public rack_purchase_modal: ModalDirective;

  @ViewChild('rack_switch_details_modal') public rack_switch_details_modal: ModalDirective;
  @ViewChild('rack_switch_purchase_modal') public rack_switch_purchase_modal: ModalDirective;

  viewArea(a) {
    this._router.navigate(['map/area', a['id']]);
  }

  areaDetailsView(a){
    this.current_area = a;
    (async () => {
      await new Promise( resolve => setTimeout(resolve, 100) );
      this.area_details_modal.show();
    })();
  }

  areaPurchaseView(a){
    this.current_area = a;
    (async () => {
      await new Promise( resolve => setTimeout(resolve, 100) );
      this.area_purchase_modal.show();
    })();
  }

  buildingDetailsView(b){
    this.current_building = b;
    (async () => {
      await new Promise( resolve => setTimeout(resolve, 100) );
      this.building_details_modal.show();
    })();
  }

  buildingPurchaseView(b){
    this.current_building = b;
    (async () => {
      await new Promise( resolve => setTimeout(resolve, 100) );
      this.building_purchase_modal.show();
    })();
  }

  rackDetailsView(r){
    this.current_rack = r;
    (async () => {
      await new Promise( resolve => setTimeout(resolve, 100) );
      this.rack_details_modal.show();
    })();
  }

  rackPurchaseView(r){
    this.current_rack = r;
    (async () => {
      await new Promise( resolve => setTimeout(resolve, 100) );
      this.rack_purchase_modal.show();
    })();
  }

  rackSwitchDetailsView(r){
    this.current_rack_switch = r;
    (async () => {
      await new Promise( resolve => setTimeout(resolve, 100) );
      this.rack_switch_details_modal.show();
    })();
  }

  rackSwitchPurchaseView(r){
    this.current_rack_switch = r;
    (async () => {
      await new Promise( resolve => setTimeout(resolve, 100) );
      this.rack_switch_purchase_modal.show();
    })();
  }

  ngAfterViewInit() {
    (async () => {
      await new Promise( resolve => setTimeout(resolve, 200) );
      if(this.tab_id === 'areas'){
        this.tabs.tabs[0].active = true;
        if(this.other_id !== null){
          const elem = document.getElementById(this.other_id);
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          elem.focus();
        }

      } else if(this.tab_id === 'buildings') {
        this.tabs.tabs[1].active = true;
      } else if(this.tab_id === 'racks') {
        this.tabs.tabs[2].active = true;
      } else if(this.tab_id === 'rack_switches') {
        this.tabs.tabs[3].active = true;
      } else if(this.tab_id === 'servers') {
        this.tabs.tabs[3].active = true;
      }
    })();
  }

  ngOnInit() {
    if(this._activRoute.firstChild !== null) {
      this._activRoute.firstChild.params.subscribe(
        (params: any) => {
          this.tab_id = params['id'];
          this.other_id = params['id2'];
        }
      );
    }

    this._apiSvc.areas().subscribe((res) => {
      for(let a of res['areas']){
        if(a['status'] === 'unpurchased') {
          this.areas.push(a);
        }
      }
    });

    this._apiSvc.building_types().subscribe((res) => {
      this.buildings = res['buildings'];
    });

    this._apiSvc.rack_types().subscribe((res) => {
      this.racks = res['rack_types'];
    });

    this._apiSvc.rack_switch_types().subscribe((res) => {
      this.rack_switches = res['rack_switch_types'];
    });
  }

}
