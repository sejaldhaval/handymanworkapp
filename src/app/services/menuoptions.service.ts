import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("userToken") })
};

export class MenuOptions {
  Id: number;
  Name: string;
  Component:string;
  Active: boolean;
  CreatedOnUtc: any;
  UpdatedOnUtc: any;
  errorMessage: string;
  errorStatus: boolean;
}

@Injectable()
export class MenuoptionsService {

  private apiUrl = environment.api + "/menuoptions";
  private handleError: HandleError;
  private handleSuccess: HandleSuccess;

  constructor(private http: HttpClient,
    HttpErrorHandlerService: HttpErrorHandlerService) {
    this.handleError = HttpErrorHandlerService.createHandleError('MenuOptionsService');
    this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('MenuOptionsService');
  }

  listFiltered(whereString: string): Observable<MenuOptions[]> {
      return this.http.get<MenuOptions[]>(this.apiUrl + "/listFiltered/" + whereString, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listFiltered", result) }),
      catchError(this.handleError<MenuOptions[]>(`listFiltered whereString=${whereString}`))
      );
  }
  listAll(): Observable<MenuOptions[]> {
      return this.http.get<MenuOptions[]>(this.apiUrl + "/listAll", httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listAll", result) }),
      catchError(this.handleError('listAll', []))
      );
  }
  get(id: number): Observable<MenuOptions> {
      return this.http.get<MenuOptions>(this.apiUrl + "/get/" + id, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("get", result) }),
      catchError(this.handleError<MenuOptions>(`get id=${id}`))
      );
  }
  create(item: MenuOptions): Observable<MenuOptions> {
    return this.http.post<MenuOptions>(this.apiUrl + "/create", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("create", result) }),
      catchError(this.handleError<MenuOptions>('create'))
      );
  }
  update(item: MenuOptions): Observable<any> {
    return this.http.post(this.apiUrl + "/update", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("update", result) }),
      catchError(this.handleError<any>('update'))
      );
  }
  delete(item: MenuOptions | number): Observable<MenuOptions> {
    const id = typeof item === 'number' ? item : item.Id;
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.post<MenuOptions>(url, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("delete", result) }),
      catchError(this.handleError<MenuOptions>('delete'))
      );
  }
}
