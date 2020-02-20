import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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

  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    this.sock.disconnect();
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler(event) {
    this.sock.disconnect();
  }


  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    
  }

  ngOnDestroy(){
  }


}
