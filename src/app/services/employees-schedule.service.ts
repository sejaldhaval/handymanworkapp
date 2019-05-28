import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class EmployeeSchedule {
  Id: number;
  EmployeeId: number;
  StartDate?: string;
  EndDate?: string;
  CreatedOnUtc?: any;
  UpdatedOnUtc?: any;
  errorMessage?: string;
  errorStatus?: boolean;
}

@Injectable()
export class EmployeeScheduleService {

  private apiUrl = environment.api + "/employeeschedule";
  private handleError: HandleError;
  private handleSuccess: HandleSuccess;

  constructor(private http: HttpClient,
    HttpErrorHandlerService: HttpErrorHandlerService) {
    this.handleError = HttpErrorHandlerService.createHandleError('EmployeeScheduleService');
    this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('EmployeeScheduleService');
  }

  listFiltered(whereString: string): Observable<EmployeeSchedule[]> {
      return this.http.get<EmployeeSchedule[]>(this.apiUrl + "/listFiltered/" + whereString, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listFiltered", result) }),
      catchError(this.handleError<EmployeeSchedule[]>(`listFiltered whereString=${whereString}`))
      );
  }
  listAll(): Observable<EmployeeSchedule[]> {
      return this.http.get<EmployeeSchedule[]>(this.apiUrl + "/listAll", httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listAll", result) }),
      catchError(this.handleError('listAll', []))
      );
  }
  get(id: number): Observable<EmployeeSchedule> {
      return this.http.get<EmployeeSchedule>(this.apiUrl + "/get/" + id, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("get", result) }),
      catchError(this.handleError<EmployeeSchedule>(`get id=${id}`))
      );
  }
  create(item: EmployeeSchedule): Observable<EmployeeSchedule> {
    return this.http.post<EmployeeSchedule>(this.apiUrl + "/create", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("create", result) }),
      catchError(this.handleError<EmployeeSchedule>('create'))
      );
  }
  update(item: EmployeeSchedule): Observable<any> {
    return this.http.post(this.apiUrl + "/update", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("update", result) }),
      catchError(this.handleError<any>('update'))
      );
  }
  delete(item: EmployeeSchedule | number): Observable<EmployeeSchedule> {
    const id = typeof item === 'number' ? item : item.Id;
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.post<EmployeeSchedule>(url, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("delete", result) }),
      catchError(this.handleError<EmployeeSchedule>('delete'))
      );
  }
}
