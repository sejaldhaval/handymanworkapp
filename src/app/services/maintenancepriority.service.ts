import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("userToken") })
};

export class MaintenancePriority {
  Id: number;
  Name: string;
  CreatedOnUtc: any;
  UpdatedOnUtc: any;
  errorMessage: string;
  errorStatus: boolean;
}

@Injectable()
export class MaintenancepriorityService {

  private apiUrl = environment.api + "/maintenancepriority";
  private handleError: HandleError;
  private handleSuccess: HandleSuccess;

  constructor(private http: HttpClient,
    HttpErrorHandlerService: HttpErrorHandlerService) {
    this.handleError = HttpErrorHandlerService.createHandleError('MaintenancePriorityService');
    this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('MaintenancePriorityService');
  }

  listFiltered(whereString: string): Observable<MaintenancePriority[]> {
      return this.http.get<MaintenancePriority[]>(this.apiUrl + "/listFiltered/" + whereString, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listFiltered", result) }),
      catchError(this.handleError<MaintenancePriority[]>(`listFiltered whereString=${whereString}`))
      );
  }
  listAll(): Observable<MaintenancePriority[]> {
      return this.http.get<MaintenancePriority[]>(this.apiUrl + "/listAll", httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listAll", result) }),
      catchError(this.handleError('listAll', []))
      );
  }
  get(id: number): Observable<MaintenancePriority> {
      return this.http.get<MaintenancePriority>(this.apiUrl + "/get/" + id, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("get", result) }),
      catchError(this.handleError<MaintenancePriority>(`get id=${id}`))
      );
  }
  create(item: MaintenancePriority): Observable<MaintenancePriority> {
    return this.http.post<MaintenancePriority>(this.apiUrl + "/create", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("create", result) }),
      catchError(this.handleError<MaintenancePriority>('create'))
      );
  }
  update(item: MaintenancePriority): Observable<any> {
    return this.http.post(this.apiUrl + "/update", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("update", result) }),
      catchError(this.handleError<any>('update'))
      );
  }
  delete(item: MaintenancePriority | number): Observable<MaintenancePriority> {
    const id = typeof item === 'number' ? item : item.Id;
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.post<MaintenancePriority>(url, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("delete", result) }),
      catchError(this.handleError<MaintenancePriority>('delete'))
      );
  }
}
