import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("userToken") })
};

export class Employee {
  Id: number;
  FirstName: string;
  LastName: string;
  NickName: string;
  Mobile: string;
  Email: string;
  Password: string;
  Active: boolean;
  CreatedOnUtc: any;
  UpdatedOnUtc: any
  RoleId: number;
  RoleName: string;
  LocationId: number;
  LocationName: string;
  DefaultMenuId: number;
  DefaultMenuName: string;
  DefaultMenuComponent: string;
  errorMessage: string;
  errorStatus: boolean;
}

@Injectable()
export class EmployeeService {

  private apiUrl = environment.api + "/employee";
  private handleError: HandleError;
  private handleSuccess: HandleSuccess;

  constructor(private http: HttpClient,
    HttpErrorHandlerService: HttpErrorHandlerService) {
    this.handleError = HttpErrorHandlerService.createHandleError('EmployeeService');
    this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('EmployeeService');
  }

  listFiltered(whereString: string): Observable<Employee[]> {
      console.log(httpOptions);
      return this.http.get<Employee[]>(this.apiUrl + "/listFiltered/" + whereString, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listFiltered", result) }),
      catchError(this.handleError<Employee[]>(`listFiltered wherestring=${whereString}`))
      );
  }
  listAll(): Observable<Employee[]> {
      return this.http.get<Employee[]>(this.apiUrl + "/listAll", httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listAll", result) }),
      catchError(this.handleError('listAll', []))
      );
  }
  get(id: number): Observable<Employee> {
      return this.http.get<Employee>(this.apiUrl + "/get/" + id, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("get", result) }),
      catchError(this.handleError<Employee>(`get id=${id}`))
      );
  }
    //Will need No-Auth in the header
  create(item: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl + "/create", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("create", result) }),
      catchError(this.handleError<Employee>('create'))
      );
  }
  update(item: Employee): Observable<any> {
    return this.http.post(this.apiUrl + "/update", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("update", result) }),
      catchError(this.handleError<any>('update'))
      );
  }
  delete(item: Employee | number): Observable<Employee> {
    const id = typeof item === 'number' ? item : item.Id;
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.post<Employee>(url, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("delete", result) }),
      catchError(this.handleError<Employee>('delete'))
      );
  }
}
