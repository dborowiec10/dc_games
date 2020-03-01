import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../auth.service';
import { ApiService } from '../../api.service';
import { SocketService } from '../../socket.service';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../../state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  public currentUser = null;
  public currentCompany = null;
  public currentDatetime = null;

  constructor(
    private auth_service: AuthService,
    private api_svc: ApiService,
    private socket_service: SocketService,
    private toast: ToastrService,
    private state: StateService

  ) {}

  logout(){
    this.auth_service.logout();
  }

  ngOnInit(){
    this.updateState();
    
    this.socket_service.connect(this.currentUser["id"]);

    this.socket_service.registerObserver("datetime", (data) => {
      this.currentDatetime = data["datetime"];
    });

    this.socket_service.registerObserver(this.currentUser["id"], (msg) => {
      // this.toast.success("Successfully connected to the management server!", "Connected!");
    });


    this.state.update.subscribe((res) => {
      if(res === "user"){
        this.updateState();
      }
    })
  }

  private updateState(){
    this.currentUser = this.state.user;
    this.currentCompany = this.currentUser['company'];
  }
}
