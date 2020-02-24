import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { StateUpdateService } from '../../state-update.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit, AfterViewInit {

  constructor(
    private _apiSvc: ApiService,
    private _router: Router,
    private _activRoute: ActivatedRoute,
    private toast: ToastrService,
    private state: StateUpdateService
  ){}
  
  public math = Math;

  public areas = [];
  public buildings = [];
  public rack_types = [];
  public rack_switch_types = [];
  public rack_pdu_types = [];
  public accelerator_types = [];
  public cpu_types = [];
  public memory_types = [];
  public psu_types = [];
  public server_cooling_types = [];
  public server_types = [];

  public selected_quantity = 1;
  public custom_rack_max_server_capacity = 20;
  public custom_rack_rack_pdu = null;
  public custom_rack_rack_switch = null;
  
  private tab_id = 'areas';
  private other_id = null;

  public current_area = null;
  public current_building = null;

  public custom_rack_done = false;
  public custom_server_done = false;

  @ViewChild('tabs') tabs;
  @ViewChild('area_details_modal') public area_details_modal: ModalDirective;
  @ViewChild('area_purchase_modal') public area_purchase_modal: ModalDirective;

  @ViewChild('building_details_modal') public building_details_modal: ModalDirective;
  @ViewChild('building_purchase_modal') public building_purchase_modal: ModalDirective;

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

  rack_pdu_by_type(type: string): object {
    for(let rt of this.rack_pdu_types){
      if(rt['type'] === type){
        return rt;
      }
    }
    return null;
  }

  rack_switch_by_type(type: string): object {
    for(let rt of this.rack_switch_types){
      if(rt['type'] === type){
        return rt;
      }
    }
    return null;
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
      } else if(this.tab_id === 'servers') {
        this.tabs.tabs[3].active = true;
      }
    })();
  }

  purchaseArea(area: any){
    console.log(area)
    this._apiSvc.buy_area(area["id"]).subscribe((res) => {
      this.state.update.next(true);
      if(res["data"]["success"]){
        this.toast.success(res["data"]["success"], "Purchase Successful!", {
          timeOut: 8000
        });
      } else {
        this.toast.error(res["data"]["error"], "Purchase Unsuccessful!", {
          timeOut: 8000
        });
      }
    })
    this.area_purchase_modal.hide();
  }

  purchaseBuilding(building_type: any){
    console.log(building_type);
    this.building_purchase_modal.hide();
  }

  purchaseRack(rack_type: any, quantity: number){
    let type = {}
    if(rack_type === "custom"){
      type["type"] = "custom";
      type["rack_pdu"] = {
        type: this.custom_rack_rack_pdu
      };
      type["rack_switch"] = {
        type: this.custom_rack_rack_switch
      };
      type["max_server_capacity"] = this.custom_rack_max_server_capacity
      type["base_price"] = 500 + (this.custom_rack_max_server_capacity * 150);
    } else {
      type = rack_type;
    }
    this._apiSvc.buy_rack(type, quantity).subscribe((res) => {
      this.state.update.next(true);
      if(res["data"]["success"]){
        this.toast.success(res["data"]["success"], "Purchase Successful!", {
          timeOut: 8000
        });
      } else {
        this.toast.error(res["data"]["error"], "Purchase Unsuccessful!", {
          timeOut: 8000
        });
      }
    });
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

    this._apiSvc.rack_switch_types().subscribe((res) => {
      this.rack_switch_types = res['rack_switch_types'];
      this.custom_rack_rack_switch = this.rack_switch_types[0]['type'];
    });

    this._apiSvc.rack_pdu_types().subscribe((res) => {
      this.rack_pdu_types = res['rack_pdu_types'];
      this.custom_rack_rack_pdu = this.rack_pdu_types[0]['type'];
    });

    this._apiSvc.rack_types().subscribe((res) => {
      this.rack_types = res['rack_types'];
      this.custom_rack_done = true;
    });

    this._apiSvc.accelerator_types().subscribe((res) => {
      this.accelerator_types = res['accelerator_types'];
    });

    this._apiSvc.cpu_types().subscribe((res) => {
      this.cpu_types = res['cpu_types'];
    });

    this._apiSvc.memory_types().subscribe((res) => {
      this.memory_types = res['memory_types'];
    });

    this._apiSvc.psu_types().subscribe((res) => {
      this.psu_types = res['psu_types'];
    });

    this._apiSvc.server_cooling_types().subscribe((res) => {
      this.server_cooling_types = res['server_cooling_types'];
    });

    this._apiSvc.server_types().subscribe((res) => {
      this.server_types = res['server_types'];
      this.custom_server_done = true;
    });
  }
}
