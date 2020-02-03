import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatacentersService {

  constructor(private http: HttpClient) { }

  /**
  * Http options
  */
  httpOptions = {
      params: undefined
  };

  /**
  * Handles http errors
  * @param err
  */
  static handleError(err: HttpErrorResponse): any {
      if (err.error.status && err.error.object) {
          return err.error;
      } else {
          return {status: 'error', object: err.statusText};
      }
  }


  // /**
  //  * Retrieves all installed R packages
  //  */
  // datacenters(): Observable<any> {

  // }

  /**
   * Retrieves all installed R packages
   */
  packages(): Observable<any> {
      return this.http.get(environment.platformApiEndpoint + '/r/index', this.httpOptions).catch(
          (err) => {
              return Observable.of(DatacentersService.handleError(err));
          }
      );
  }

  /**
   * Adds a new R package
   * @param pckg
   * @param repoType
   */
  addPackage(pckg: string, repoType: string): Observable<any> {
      this.httpOptions.params = {
          'pckg': pckg,
          'repoType': repoType
      };
      return this.http.post(environment.platformApiEndpoint + '/r/add', {}, this.httpOptions).catch(
          (err) => {
              return Observable.of(DatacentersService.handleError(err));
          }
      );
  }

  /**
   * Deletes an R package
   * @param pckg
   */
  deletePackage(pckg: string): Observable<any> {
      return this.http.delete(environment.platformApiEndpoint + '/r/' + pckg, this.httpOptions).catch(
          (err) => {
              return Observable.of(DatacentersService.handleError(err));
          }
      );
  }

  /**
   * Updates all R packages
   */
  updatePackages(): Observable<any> {
      return this.http.put(environment.platformApiEndpoint + '/r/update', this.httpOptions).catch(
          (err) => {
              return Observable.of(DatacentersService.handleError(err));
          }
      );
  }


}
