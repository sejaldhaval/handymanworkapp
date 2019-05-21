import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
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
export class Email {
    Name: string;
    EmailAddress: string;
    Phone: string;
    Message: string;
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
  create(item: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl + "/create", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("create", result) }),
      catchError(this.handleError<Employee>('create'))
      );
  }
 
  sendEmail(): Observable<any> {
      let data: Email = { Name: "Sejal", EmailAddress: "sejaldhaval@gmail.com", Phone: "8325617759", Message: "Message" };

      const httpOptions1 = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      return this.http.post<any>(environment.api + "/sendemail/send", data, httpOptions1)
          .pipe(
          map((result: any) => { return this.handleSuccess("create", result) }),
          catchError(this.handleError<any>('create'))
          );
  }
  update(item: Employee): Observable<any> {
    return this.http.post(this.apiUrl + "/update", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("update", result) }),
      catchError(this.handleError<any>('update'))
      );
  }
  delete(Id: number): Observable<boolean> {
      return this.http.get<boolean>(this.apiUrl + "/delete/" + Id, httpOptions)
          .pipe(
          map((result: any) => { return this.handleSuccess("delete", result) }),
          catchError(this.handleError<boolean>('delete'))
          );
  }
}
