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

  areas_by_company(company_id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/areas/company/' + company_id);
  }

  building_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/building_types', {});
  }

  buildings_by_company(company_id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/buildings/company/' + company_id);
  }

  rack_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/rack_types', {});
  }

  racks_by_company(company_id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/racks/company/' + company_id);
  }

  rack_switch_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/rack_switch_types', {});
  }

  rack_switches_by_company(company_id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/rack_switches/company/' + company_id);
  }

  rack_pdu_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/rack_pdu_types', {});
  }

  rack_pdus_by_company(company_id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/rack_pdus/company/' + company_id);
  }

  accelerator_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/accelerator_types', {});
  }

  accelerators_by_company(company_id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/accelerators/company/' + company_id);
  }

  cpu_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/cpu_types', {});
  }

  cpus_by_company(company_id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/cpus/company/' + company_id);
  }

  memory_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/memory_types', {});
  }

  memories_by_company(company_id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/memories/company/' + company_id);
  }

  psu_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/psu_types', {});
  }

  psus_by_company(company_id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/psus/company/' + company_id);
  }

  server_cooling_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/server_cooling_types', {});
  }

  server_coolings_by_company(company_id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/server_coolings/company/' + company_id);
  }

  server_types(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/server_types', {});
  }

  servers_by_company(company_id: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/servers/company/' + company_id);
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

  buy_area(area_id: string): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/areas', {
      id: area_id
    });
  }

  buy_building(type: any): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/buildings', {
      type: type
    });
  }

  buy_rack(type: any, quantity: number): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/racks', {
      type: type,
      quantity: quantity
    });
  }

  buy_server(type: any, quantity: number): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/servers', {
      type: type,
      quantity: quantity
    });
  }



}
