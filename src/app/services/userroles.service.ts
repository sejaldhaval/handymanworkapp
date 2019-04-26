import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class UserRoles {
  Id: number;
  Name: string;
  CreatedOnUtc: any;
  UpdatedOnUtc: any;
  errorMessage: string;
  errorStatus: boolean;
}

@Injectable()
export class UserrolesService {

  private apiUrl = environment.api + "/userroles";
  private handleError: HandleError;
  private handleSuccess: HandleSuccess;

  constructor(private http: HttpClient,
    HttpErrorHandlerService: HttpErrorHandlerService) {
    this.handleError = HttpErrorHandlerService.createHandleError('UserRolesService');
    this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('UserRolesService');
  }

  listFiltered(whereString: string): Observable<UserRoles[]> {
      return this.http.get<UserRoles[]>(this.apiUrl + "/listFiltered/" + whereString, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listFiltered", result) }),
      catchError(this.handleError<UserRoles[]>(`listFiltered whereString=${whereString}`))
      );
  }
  listAll(): Observable<UserRoles[]> {
      return this.http.get<UserRoles[]>(this.apiUrl + "/listAll", httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listAll", result) }),
      catchError(this.handleError('listAll', []))
      );
  }
  get(id: number): Observable<UserRoles> {
      return this.http.get<UserRoles>(this.apiUrl + "/get/" + id, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("get", result) }),
      catchError(this.handleError<UserRoles>(`get id=${id}`))
      );
  }
  create(item: UserRoles): Observable<UserRoles> {
    return this.http.post<UserRoles>(this.apiUrl + "/create", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("create", result) }),
      catchError(this.handleError<UserRoles>('create'))
      );
  }
  update(item: UserRoles): Observable<any> {
    return this.http.post(this.apiUrl + "/update", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("update", result) }),
      catchError(this.handleError<any>('update'))
      );
  }
  delete(item: UserRoles | number): Observable<UserRoles> {
    const id = typeof item === 'number' ? item : item.Id;
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.post<UserRoles>(url, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("delete", result) }),
      catchError(this.handleError<UserRoles>('delete'))
      );
  }
}
