import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("userToken") })
};

export class UserRolesMenuOptionsMapping {
  Id: number;
  UserRoleId: number;
  UserRoleName: string;
  CreatedOnUtc: any;
  UpdatedOnUtc: any;
  MenuOptionId: number;
  MenuOptionName: string;
  DeleteAccess: boolean;
  CreateAccess: boolean;
  UpdateAccess: boolean;
  ReadAccess: boolean;
  errorMessage: string;
  errorStatus: boolean;
}

@Injectable()
export class UserrolesmenuoptionsmappingService {

  private apiUrl = environment.api + "/userrolesmenuoptionsmapping";
  private handleError: HandleError;
  private handleSuccess: HandleSuccess;

  constructor(private http: HttpClient,
    HttpErrorHandlerService: HttpErrorHandlerService) {
    this.handleError = HttpErrorHandlerService.createHandleError('UserRolesMenuOptionsMappingService');
    this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('UserRolesMenuOptionsMappingService');
  }

  listFiltered(whereString: string): Observable<UserRolesMenuOptionsMapping[]> {
      return this.http.get<UserRolesMenuOptionsMapping[]>(this.apiUrl + "/listFiltered/" + whereString, httpOptions)
          .pipe(
          map((result: any) => { return this.handleSuccess("listFiltered", result) }),
          catchError(this.handleError<UserRolesMenuOptionsMapping[]>(`listFiltered whereString=${whereString}`))
          );
  }
  listAll(): Observable<UserRolesMenuOptionsMapping[]> {
      return this.http.get<UserRolesMenuOptionsMapping[]>(this.apiUrl + "/listAll", httpOptions)
          .pipe(
          map((result: any) => { return this.handleSuccess("listAll", result) }),
          catchError(this.handleError('listAll', []))
          );
  }
  get(id: number): Observable<UserRolesMenuOptionsMapping> {
      return this.http.get<UserRolesMenuOptionsMapping>(this.apiUrl + "/get/" + id, httpOptions)
          .pipe(
          map((result: any) => { return this.handleSuccess("get", result) }),
          catchError(this.handleError<UserRolesMenuOptionsMapping>(`get id=${id}`))
          );
  }
  create(item: UserRolesMenuOptionsMapping): Observable<UserRolesMenuOptionsMapping> {
      return this.http.post<UserRolesMenuOptionsMapping>(this.apiUrl + "/create", item, httpOptions)
          .pipe(
          map((result: any) => { return this.handleSuccess("create", result) }),
          catchError(this.handleError<UserRolesMenuOptionsMapping>('create'))
          );
  }
  update(item: UserRolesMenuOptionsMapping): Observable<any> {
      return this.http.post(this.apiUrl + "/update", item, httpOptions)
          .pipe(
          map((result: any) => { return this.handleSuccess("update", result) }),
          catchError(this.handleError<any>('update'))
          );
  }
  delete(item: UserRolesMenuOptionsMapping | number): Observable<UserRolesMenuOptionsMapping> {
      const id = typeof item === 'number' ? item : item.Id;
      const url = `${this.apiUrl}/delete/${id}`;
      return this.http.post<UserRolesMenuOptionsMapping>(url, httpOptions)
          .pipe(
          map((result: any) => { return this.handleSuccess("delete", result) }),
          catchError(this.handleError<UserRolesMenuOptionsMapping>('delete'))
          );
  }
}
