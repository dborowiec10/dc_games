import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';
import { SocketService } from './socket.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private auth_service: AuthService, private sock: SocketService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.auth_service.getUser().subscribe((res) => {
      this.sock.join(res["user"]["id"]);
    })
  }

  ngOnDestroy(){
    this.auth_service.getUser().subscribe((res) => {
      this.sock.leave(res["user"]["id"]);
    })
  }


}
