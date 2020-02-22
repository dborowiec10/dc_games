import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
      params: undefined
  };

  static handleError(err: HttpErrorResponse): any {
    if (err.error.status && err.error.object) {
        return err.error;
    } else {
        return {status: 'error', object: err.statusText};
    }
  }

  constructor(private http: HttpClient) {}

  areas(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/areas', {});
  }

  building_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/building_types', {});
  }

  rack_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/rack_types', {});
  }

  rack_switch_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/rack_switch_types', {});
  }

  rack_pdu_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/rack_pdu_types', {});
  }

  accelerator_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/accelerator_types', {});
  }

  cpu_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/cpu_types', {});
  }

  memory_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/memory_types', {});
  }

  psu_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/psu_types', {});
  }

  server_cooling_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/server_cooling_types', {});
  }

  server_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/server_types', {});
  }

  companies(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/companies', {});
  }

  company(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/companies/' + id, {});
  }

  users(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/users', {});
  }

  user(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/users/' + id, {});
  }

}
