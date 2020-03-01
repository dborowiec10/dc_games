import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import { StateService } from '../../state.service';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  encapsulation: ViewEncapsulation.None
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
  public areas = {};
  public buildings = {};
  public racks = {};
  public servers = {};

  ColumnMode = ColumnMode;
  SortType = SortType;

  @ViewChild('areasTable', { static: false }) areas_table: any;
  @ViewChild('buildingsTable', { static: false }) buildings_table: any;
  @ViewChild('racksTable', { static: false }) racks_table: any;
  @ViewChild('serversTable', { static: false }) servers_table: any;

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

  toggleExpandRowArea(row) {
    this.areas_table.rowDetail.toggleExpandRow(row);
  }

  toggleExpandRowBuilding(row) {
    this.buildings_table.rowDetail.toggleExpandRow(row);
  }

  toggleExpandRowRack(row) {
    this.racks_table.rowDetail.toggleExpandRow(row);
  }
  
  toggleExpandRowServer(row) {
    this.servers_table.rowDetail.toggleExpandRow(row);
  }

  loadAreas(){
    this.state.getUserAreas().subscribe((res) => {
      this.areas = res;
      console.log(this.areas);
    });
  }

  loadBuildings(){
    this.state.getBuildings(false).subscribe((res) => {
      this.buildings = res;
      console.log(this.buildings);
    });
  }

  loadRacks(){
    this.state.getRacks(false).subscribe((res) => {
      this.racks = res;
      console.log(this.racks);
    });
  }

  loadServers(){
    this.state.getServers(false).subscribe((res) => {
      this.servers = res;
      console.log(this.servers)
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
    this.areas = {};
    this.buildings = {};
    this.racks = {};
    this.servers = {};
  }
}
