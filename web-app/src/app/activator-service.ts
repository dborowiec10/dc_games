import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import { filter } from 'rxjs/operators';
import { SocketService } from './socket.service';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root'
})
export class ActivatorService implements CanActivate {

    prevUrl: string;

    /**
     * Constructs the class
     * @param authService
     * @param router
     */
    constructor(
        private authService: AuthService,
        private sock: SocketService,
        private state: StateService,
        private router: Router
    ) {

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(
        (e) => {
          this.prevUrl = e['url'];
        }
      );
    }

    /**
     * Determines whether a visited route can be in fact visited by a specific user
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.reload_user()
        .pipe(
          map((res) => {
            this.state.user = res;
            if (state.url.startsWith('/404')) {
              return true;
            } else if (state.url.startsWith('/login')) {
                if (this.authService.isLoggedIn()) {
                  this.router.navigate([(this.prevUrl) ? this.prevUrl : '/']);
                }
                return true;
            } else if (this.authService.isLoggedOut()) {
                this.authService.logout();
                this.router.navigate(['login'], {queryParams: {pr: state.url}});
                return true;
            } else {
              return true;
            }
          })
        );
    }
}
