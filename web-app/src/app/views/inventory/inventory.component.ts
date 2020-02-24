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
  public servers = [];

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

    this.auth_service.getUser().subscribe(res => {
      this.current_user = res["user"];

      this._apiSvc.areas_by_company(this.current_user['company_id']).subscribe((a_res) => {
        this.areas = a_res["areas"];
      });

      this._apiSvc.buildings_by_company(this.current_user['company_id']).subscribe((b_res) => {
        this.buildings = b_res["buildings"];
      });

      this._apiSvc.racks_by_company(this.current_user['company_id']).subscribe((r_res) => {
        this.racks = r_res["racks"];
      });

      this._apiSvc.servers_by_company(this.current_user['company_id']).subscribe((s_res) => {
        this.servers = s_res["servers"];
      });

    });

  }
}
