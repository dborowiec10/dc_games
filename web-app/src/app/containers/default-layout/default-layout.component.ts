import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../auth.service';
import { ApiService } from '../../api.service';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  public currentUser = null;
  public currentDatetime = null;

  is(thing){
    if(thing){
      console.log(thing);
      return true;
    }
    return false;
  }

  constructor(
    private auth_service: AuthService,
    private api_svc: ApiService,
    private socket_service: SocketService
  ) {}

  logout(){
    this.auth_service.logout();
  }

  ngOnInit(){
    this.auth_service.getUser().subscribe(res => {
      this.currentUser = res['user'];
    });

    this.socket_service.getDatetime().subscribe((message) => {
      this.currentDatetime = message["datetime"];
    });
  }
}
