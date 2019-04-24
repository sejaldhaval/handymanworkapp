import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AlertnotificationComponent } from './shared-components/alertnotification/alertnotification.component';

/** Type of the handleError function returned by HttpErrorHandlerService.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

export type HandleSuccess =
  <T> (response: any, operation?: string) => any;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandlerService {
    constructor(private alertnotificationComponent: AlertnotificationComponent) { }

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = '') => <T>
    (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result);

  createHandleSuccess = (serviceName = '') => <T>
    (operation = 'operation', response: any) => this.handleSuccess(serviceName, operation, response);

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;

      // TODO: better job of transforming error for user consumption
      //this.addErrorMessage(`${serviceName}: ${operation} failed: ${message}`);
      this.alertnotificationComponent.setErrorMessage(`serviceName: ${serviceName}, operation: ${operation}, failed with message: ${message}`);

      // Let the app keep running by returning a safe result.
      return of(result);
    };
  }


  handleSuccess(serviceName = '', operation = 'operation', response: any) {
      if (!response.errorStatus) {
      return response.data;
    }
    else {
      const message =
        `server returned code with error "${response.errorMessage}"`;
      //this.addErrorMessage(`${serviceName}: ${operation} failed: ${message}`);
      this.alertnotificationComponent.setSuccessMessage(`serviceName: ${serviceName}, operation: ${operation}, success with message: ${message}`);
    }
  }

  addErrorMessage(error: string) {
 
  }
}
