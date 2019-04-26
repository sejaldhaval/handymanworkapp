import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class MaintenanceIssueStatus {
  Id: number;
  Name: string;
  CreatedOnUtc: any;
  UpdatedOnUtc: any;
  errorMessage: string;
  errorStatus: boolean;
}

@Injectable()
export class MaintenanceissuestatusService {

  private apiUrl = environment.api + "/maintenanceissuestatus";
  private handleError: HandleError;
  private handleSuccess: HandleSuccess;

  constructor(private http: HttpClient,
    HttpErrorHandlerService: HttpErrorHandlerService) {
    this.handleError = HttpErrorHandlerService.createHandleError('MaintenanceIssueStatusService');
    this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('MaintenanceIssueStatusService');
  }

  listFiltered(whereString: string): Observable<MaintenanceIssueStatus[]> {
      return this.http.get<MaintenanceIssueStatus[]>(this.apiUrl + "/listFiltered/" + whereString, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listFiltered", result) }),
      catchError(this.handleError<MaintenanceIssueStatus[]>(`listFiltered whereString=${whereString}`))
      );
  }
  listAll(): Observable<MaintenanceIssueStatus[]> {
      return this.http.get<MaintenanceIssueStatus[]>(this.apiUrl + "/listAll", httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listAll", result) }),
      catchError(this.handleError('listAll', []))
      );
  }
  get(id: number): Observable<MaintenanceIssueStatus> {
      return this.http.get<MaintenanceIssueStatus>(this.apiUrl + "/get/" + id, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("get", result) }),
      catchError(this.handleError<MaintenanceIssueStatus>(`get id=${id}`))
      );
  }
  create(item: MaintenanceIssueStatus): Observable<MaintenanceIssueStatus> {
    return this.http.post<MaintenanceIssueStatus>(this.apiUrl + "/create", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("create", result) }),
      catchError(this.handleError<MaintenanceIssueStatus>('create'))
      );
  }
  update(item: MaintenanceIssueStatus): Observable<any> {
    return this.http.post(this.apiUrl + "/update", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("update", result) }),
      catchError(this.handleError<any>('update'))
      );
  }
  delete(item: MaintenanceIssueStatus | number): Observable<MaintenanceIssueStatus> {
    const id = typeof item === 'number' ? item : item.Id;
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.post<MaintenanceIssueStatus>(url, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("delete", result) }),
      catchError(this.handleError<MaintenanceIssueStatus>('delete'))
      );
  }
}
