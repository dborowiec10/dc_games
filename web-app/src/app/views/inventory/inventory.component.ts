import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import { StateService } from '../../state.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {

  constructor(
    private _router: Router,
    private _activRoute: ActivatedRoute,
    private toast: ToastrService,
    private state: StateService,
  ){
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public sub: any;
  
  public math = Math;
  public current_user = null;
  public areas = [];
  public buildings = [];
  public racks = [];
  public servers = [];

  private tab_id = 'areas';
  
  @ViewChild('tabs') tabs;

  viewArea(a) {
    this._router.navigate(['map/area', a['id']]);
  }

  ngAfterViewInit() {
    (async () => {
      await new Promise( resolve => setTimeout(resolve, 200) );
      if(this.tab_id === 'areas'){
        this.tabs.tabs[0].active = true;
      } else if(this.tab_id === 'buildings') {
        this.tabs.tabs[1].active = true;
      } else if(this.tab_id === 'racks') {
        this.tabs.tabs[2].active = true;
      } else if(this.tab_id === 'servers') {
        this.tabs.tabs[5].active = true;
      }
    })();

  }

  loadAreas(){
    this.state.getUserAreas().subscribe((res) => {
      this.areas = res;
    });
  }

  loadBuildings(){
    this.state.getBuildings(false).subscribe((res) => {
      this.buildings = res;
    });
  }

  loadRacks(){
    this.state.getRacks(false).subscribe((res) => {
      this.racks = res;
    });
  }

  loadServers(){
    this.state.getServers(false).subscribe((res) => {
      this.servers = res;
    });
  }

  ngOnInit() {
    if(this._activRoute.firstChild !== null) {
      this._activRoute.firstChild.params.subscribe(
        (params: any) => {
          this.tab_id = params['id'];
        }
      );
    }

    this.current_user = this.state.user;

    this.loadAreas();
    this.loadBuildings();
    this.loadRacks();
    this.loadServers();
  }

  ngOnDestroy(){
    this.areas = [];
    this.buildings = [];
    this.racks = [];
    this.servers = [];
  }
}
