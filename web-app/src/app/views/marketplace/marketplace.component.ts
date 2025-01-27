import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../../state.service';

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
    private state: StateService
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

  public custom_server_max_cpus = 1;
  public custom_server_max_memories = 2
  public custom_server_max_accelerators = 0;
  public custom_server_cpu = null;
  public custom_server_cpu_quantity = 1;
  public custom_server_memory = null;
  public custom_server_memory_quantity = 2;
  public custom_server_accelerator = null;
  public custom_server_accelerator_quantity = 1;
  public custom_server_psu = null;
  public custom_server_cooling = null;
  
  private tab_id = 'areas';
  private other_id = null;

  public current_area = null;
  public current_building = null;

  public custom_rack_done = false;
  public custom_server_done = false;

  @ViewChild('tabs') tabs;
  @ViewChild('area_purchase_modal') public area_purchase_modal: ModalDirective;
  @ViewChild('building_purchase_modal') public building_purchase_modal: ModalDirective;

  range_of(n: number, startFrom: number): number[] {
    return Array.from(Array(parseInt(n.toString(), 10)).keys()).map(i => i + parseInt(startFrom.toString()));
  }

  viewArea(a) {
    this._router.navigate(['map/area', a['id']]);
  }

  areaPurchaseView(a){
    this.current_area = a;
    (async () => {
      await new Promise( resolve => setTimeout(resolve, 100) );
      this.area_purchase_modal.show();
    })();
  }

  buildingPurchaseView(b){
    this.current_building = b;
    (async () => {
      await new Promise( resolve => setTimeout(resolve, 100) );
      this.building_purchase_modal.show();
    })();
  }

  cpu_by_type(type: string): object {
    for(let c of this.cpu_types){
      if(c['type'] === type){
        return c;
      }
    }
    return null;
  }

  memory_by_type(type: string): object {
    for(let m of this.memory_types){
      if(m['type'] === type){
        return m;
      }
    }
    return null;
  }

  accelerator_by_type(type: string): object {
    for(let a of this.accelerator_types){
      if(a['type'] === type){
        return a;
      }
    }
    return null;
  }

  psu_by_type(type: string): object {
    for(let p of this.psu_types){
      if(p['type'] === type){
        return p;
      }
    }
    return null;
  }

  server_cooling_by_type(type: string): object {
    for(let sc of this.server_cooling_types){
      if(sc['type'] === type){
        return sc;
      }
    }
    return null;
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
    this._apiSvc.buy_area(area["id"]).subscribe((res) => {
      this.state.update.next("areas");
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
    this._apiSvc.buy_building(building_type).subscribe((res) => {
      this.state.update.next("buildings");
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
    this.building_purchase_modal.hide();
  }

  purchaseRack(rack_type: any, quantity: number){
    let type = {}
    if(rack_type === "custom"){
      type["type"] = "custom";
      type["rack_pdu"] = { type: this.custom_rack_rack_pdu };
      type["rack_switch"] = { type: this.custom_rack_rack_switch };
      type["max_server_capacity"] = this.custom_rack_max_server_capacity
      type["base_price"] = 500 + (this.custom_rack_max_server_capacity * 150);
    } else {
      type = rack_type;
    }
    this._apiSvc.buy_rack(type, quantity).subscribe((res) => {
      this.state.update.next("racks");
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

  purchaseServer(server_type: any, quantity: number){
    let type = {}
    if(server_type === "custom"){
      type["type"] = "custom";
      type["base_power_usage"] = (10 + (15 * this.custom_server_max_cpus) + (5 * this.custom_server_max_memories) + (10 * this.custom_server_max_accelerators));
      type["base_price"] = (50 + (75 * this.custom_server_max_cpus) + (75 * this.custom_server_max_memories) + (30 * this.custom_server_max_accelerators));
      type["max_cpus"] = parseInt(this.custom_server_max_cpus.toString(), 10);
      type["max_memories"] = parseInt(this.custom_server_max_memories.toString(), 10);
      type["max_accelerators"] = parseInt(this.custom_server_max_accelerators.toString(), 10);
      type["cpus"] = {
        count: parseInt(this.custom_server_cpu_quantity.toString(), 10),
        type: this.custom_server_cpu
      };
      type["memories"] = {
        count: parseInt(this.custom_server_memory_quantity.toString(), 10),
        type: this.custom_server_memory
      };
      if(this.custom_server_accelerator_quantity > 0){
        type["accelerators"] = {
          count: parseInt(this.custom_server_accelerator_quantity.toString(), 10),
          type: this.custom_server_accelerator
        };
      }
      type["psu"] = {
        type: this.custom_server_psu
      };
      type["server_cooling"] = {
        type: this.custom_server_cooling
      };
    } else {
      type = server_type;
    }
    this._apiSvc.buy_server(type, parseInt(quantity.toString())).subscribe((res) => {
      this.state.update.next("servers");
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

  loadAreas(){
    this.state.getAreas(false).subscribe((res) => {
      for(let a of res){
        if(a['status'] === 'unpurchased') {
          this.areas.push(a);
        }
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

    this.state.update.subscribe((res) => {
      if(res === "areas_done"){
        this.areas = [];
        this.loadAreas();
      }
    });

    this.loadAreas();

    this.state.getBuildingTypes().subscribe((res) => {
      this.buildings = res;
    });

    this.state.getRackSwitchTypes().subscribe((res) => {
      this.rack_switch_types = res;
      this.custom_rack_rack_switch = this.rack_switch_types[0]['type'];
    });

    this.state.getRackPduTypes().subscribe((res) => {
      this.rack_pdu_types = res;
      this.custom_rack_rack_pdu = this.rack_pdu_types[0]['type'];
    });

    this.state.getRackTypes().subscribe((res) => {
      this.rack_types = res;
      this.custom_rack_done = true;
    });

    this.state.getAcceleratorTypes().subscribe((res) => {
      this.accelerator_types = res;
      this.custom_server_accelerator = this.accelerator_types[0]['type'];
    });

    this.state.getCpuTypes().subscribe((res) => {
      this.cpu_types = res;
      this.custom_server_cpu = this.cpu_types[0]['type'];
    });

    this.state.getMemoryTypes().subscribe((res) => {
      this.memory_types = res;
      this.custom_server_memory = this.memory_types[0]['type'];
    });

    this.state.getPsuTypes().subscribe((res) => {
      this.psu_types = res;
      this.custom_server_psu = this.psu_types[0]['type'];
    });

    this.state.getServerCoolingTypes().subscribe((res) => {
      this.server_cooling_types = res;
      this.custom_server_cooling = this.server_cooling_types[0]['type'];
    });

    this.state.getServerTypes().subscribe((res) => {
      this.server_types = res;
      this.custom_server_done = true;
    });
  }
}
