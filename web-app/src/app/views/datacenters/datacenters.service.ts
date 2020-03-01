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

}
