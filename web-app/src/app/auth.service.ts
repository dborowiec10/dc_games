import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {environment} from '../environments/environment';
import * as moment from 'moment';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
      params: undefined
  };

  static handleError(err: HttpErrorResponse): any {
    return {
      'error': err.error.data.error
    };
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private sock: SocketService
  ) {}

  private set_session(result) {
    const expiresAt = moment.unix(result['data']['expires_at']);
    localStorage.setItem('id_token', result['data']['id_token']);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/login', {username, password})
    .pipe(
      map(resp => {
        this.set_session(resp);
        return {
          'status': 'Successfully Logged In!',
        };
      }),
      catchError(err => {
        return of(AuthService.handleError(err));
      })
    );
  }

  public getUser(): Observable<any> {
    const tok = localStorage.getItem('id_token');
    let user_id = null;
    user_id = jwt_decode(tok)['sub'];
    return this.http.get(environment.apiEndpoint + '/users/' + user_id)
    .pipe(
      catchError(err => {
        return of(AuthService.handleError(err));
      })
    );
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.sock.disconnect();
    this.router.navigate(['login']);
  }

  isLoggedIn(){
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(){
    return !this.isLoggedIn();
  }

  getExpiration(){
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
