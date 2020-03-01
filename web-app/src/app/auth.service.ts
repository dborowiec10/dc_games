import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, concat} from 'rxjs';
import { map, catchError, switchMap, concatAll, tap } from 'rxjs/operators';
import {environment} from '../environments/environment';
import * as moment from 'moment';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { SocketService } from './socket.service';
import { StateService } from './state.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
      params: undefined
  };

  public user = null;

  static handleError(err: HttpErrorResponse): any {
    return {
      'error': err.error.data.error
    };
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private sock: SocketService,
    private api: ApiService
  ) {}

  private set_session(result) {
    const expiresAt = moment.unix(result['data']['expires_at']);
    localStorage.setItem('id_token', result['data']['id_token']);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  public reload_user(): Observable<any> {
    if(this.isLoggedOut()){
      return new Observable((obs) => obs.next(null));
    } else {
      return this.api.user(jwt_decode(localStorage.getItem('id_token'))['sub'])
      .pipe(
        map((res) => {
          this.user = res["user"];
          return this.user;
        })
      );
    }
  }

  async login(username: string, password: string) {
    const sess = await this.api.login(username, password)
    .pipe(
      map(res => {
        this.set_session(res);
        return {
          'status': 'Successfully Logged In!',
          'user_id': jwt_decode(localStorage.getItem('id_token'))['sub']
        };
      })
    ).toPromise();

    const user = await this.api.user(sess['user_id'])
    .pipe(
      map(res => {
        this.user = res["user"]
        return this.user;
      })
    ).toPromise();
    return {"user": user, "status": sess["status"]};
  }

  private internal_logout(){
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.sock.disconnect();
    this.user = null;
  }

  logout() {
    this.internal_logout();
    this.router.navigate(['login']);
  }

  isLoggedIn(){
    const expiration = localStorage.getItem('expires_at');
    const id_token = localStorage.getItem('id_token');
    if(expiration && id_token){
      if(moment().isBefore(moment(JSON.parse(expiration)))){
        return true;
      } else {
        this.internal_logout();
        return false;
      }
    } else {
      this.internal_logout();
      return false;
    }
  }

  isLoggedOut(){
    return !this.isLoggedIn();
  }
}
