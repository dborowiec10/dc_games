import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { StateUpdateService } from '../../state-update.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, AfterViewInit {

  constructor(
    private _apiSvc: ApiService,
    private _router: Router,
    private _activRoute: ActivatedRoute,
    private toast: ToastrService,
    private state: StateUpdateService,
    private auth_service: AuthService
  ){}
  
  public math = Math;

  public current_user = null;

  public areas = [];
  public buildings = [];
  public racks = [];
  public rack_switches = [];
  public rack_pdus = [];
  public servers = [];
  public cpus = [];
  public memories = [];
  public accelerators = [];
  public psus = [];
  public server_coolings = [];

  private tab_id = 'areas';
  private other_id = null;
  

  @ViewChild('tabs') tabs;

  viewArea(a) {
    this._router.navigate(['map/area', a['id']]);
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
      } else if(this.tab_id === 'rack_pdus') {
        this.tabs.tabs[4].active = true;
      } else if(this.tab_id === 'servers') {
        this.tabs.tabs[5].active = true;
      } else if(this.tab_id === 'cpus') {
        this.tabs.tabs[6].active = true;
      } else if(this.tab_id === 'memories') {
        this.tabs.tabs[7].active = true;
      } else if(this.tab_id === 'accelerators') {
        this.tabs.tabs[8].active = true;
      } else if(this.tab_id === 'psus') {
        this.tabs.tabs[9].active = true;
      } else if(this.tab_id === 'server_coolings') {
        this.tabs.tabs[10].active = true;
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

    this.auth_service.getUser().subscribe(res => {
      this.current_user = res["user"];

      this._apiSvc.areas_by_company(this.current_user['company_id']).subscribe((a_res) => {
        this.areas = a_res["areas"];
        console.log(this.areas);
      });

      this._apiSvc.buildings_by_company(this.current_user['company_id']).subscribe((b_res) => {
        this.buildings = b_res["buildings"];
        console.log(this.buildings);
      });

      this._apiSvc.racks_by_company(this.current_user['company_id']).subscribe((r_res) => {
        this.racks = r_res["racks"];
        console.log(this.racks);
      });

      this._apiSvc.rack_switches_by_company(this.current_user['company_id']).subscribe((r_res) => {
        this.rack_switches = r_res["rack_switches"];
        console.log(this.rack_switches);
      });

      this._apiSvc.rack_pdus_by_company(this.current_user['company_id']).subscribe((r_res) => {
        this.rack_pdus = r_res["rack_pdus"];
        console.log(this.rack_pdus);
      });

      this._apiSvc.servers_by_company(this.current_user['company_id']).subscribe((s_res) => {
        this.servers = s_res["servers"];
        console.log(this.servers);
      });

      this._apiSvc.cpus_by_company(this.current_user['company_id']).subscribe((s_res) => {
        this.cpus = s_res["cpus"];
        console.log(this.cpus);
      });

      this._apiSvc.memories_by_company(this.current_user['company_id']).subscribe((s_res) => {
        this.memories = s_res["memories"];
        console.log(this.memories);
      });

      this._apiSvc.accelerators_by_company(this.current_user['company_id']).subscribe((s_res) => {
        this.accelerators = s_res["accelerators"];
        console.log(this.accelerators);
      });

      this._apiSvc.psus_by_company(this.current_user['company_id']).subscribe((s_res) => {
        this.psus = s_res["psus"];
        console.log(this.psus);
      });

      this._apiSvc.server_coolings_by_company(this.current_user['company_id']).subscribe((s_res) => {
        this.server_coolings = s_res["server_coolings"];
        console.log(this.server_coolings);
      });

    });

  }
}
