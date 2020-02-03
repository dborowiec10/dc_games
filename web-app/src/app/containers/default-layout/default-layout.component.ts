import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../auth.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  public currentUser = null;

  is(thing){
    if(thing){
      console.log(thing);
      return true;
    }
    return false;
  }

  constructor(
    private auth_service: AuthService,
    private api_svc: ApiService
  ) {}

  logout(){
    this.auth_service.logout();
  }

  ngOnInit(){
    this.auth_service.getUser().subscribe(res => {
      this.currentUser = res['user'];
    });
  }
}
