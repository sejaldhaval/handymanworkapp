import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class MaintenanceService {
  Id: number;
  LocationId: number;
  LocationName: string;
  AssignedEmployeeId: number;
  AssignedEmployeeName: string;
  Deleted: boolean;
  MaintenanceIssueStatusId: number;
  MaintenanceIssueStatusName: string;
  MaintenancePriorityId: number;
  MaintenancePriorityName: string;
  DaysToFinish: number;
  RoomId: number;
  RoomName: string;
  Comment: string;
  Description: string;
  CreatedOnUtc: any;
  UpdatedOnUtc: any;
  errorMessage: string;
  errorStatus: boolean;
}

@Injectable()
export class MaintenanceserviceService {

  private apiUrl = environment.api + "/maintenanceservice";
  private handleError: HandleError;
  private handleSuccess: HandleSuccess;

  constructor(private http: HttpClient,
    HttpErrorHandlerService: HttpErrorHandlerService) {
    this.handleError = HttpErrorHandlerService.createHandleError('MaintenanceServiceService');
    this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('MaintenanceServiceService');
  }

  listFiltered(wehereString: string): Observable<MaintenanceService[]> {
      return this.http.get<MaintenanceService[]>(this.apiUrl + "/listFiltered/" + wehereString, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listFiltered", result) }),
      catchError(this.handleError<MaintenanceService[]>(`listFiltered wehereString=${wehereString}`))
      );
  }
  listAll(): Observable<MaintenanceService[]> {
      return this.http.get<MaintenanceService[]>(this.apiUrl + "/listAll", httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listAll", result) }),
      catchError(this.handleError('listAll', []))
      );
  }
  get(id: number): Observable<MaintenanceService> {
      return this.http.get<MaintenanceService>(this.apiUrl + "/get/" + id, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("get", result) }),
      catchError(this.handleError<MaintenanceService>(`get id=${id}`))
      );
  }
  create(item: MaintenanceService): Observable<MaintenanceService> {
    return this.http.post<MaintenanceService>(this.apiUrl + "/create", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("create", result) }),
      catchError(this.handleError<MaintenanceService>('create'))
      );
  }
  update(item: MaintenanceService): Observable<any> {
    return this.http.post(this.apiUrl + "/update", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("update", result) }),
      catchError(this.handleError<any>('update'))
      );
  }
  delete(item: MaintenanceService | number): Observable<MaintenanceService> {
    const id = typeof item === 'number' ? item : item.Id;
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.post<MaintenanceService>(url, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("delete", result) }),
      catchError(this.handleError<MaintenanceService>('delete'))
      );
  }
}
