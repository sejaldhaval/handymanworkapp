import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Vendor {
  Id: number;
  Name: string;
  Phone: string;
  Email: string;
  Street1: string;
  Street2: string;
  City: string;
  State: string;
  Zipcode: string;
  Country: string;
  Active: boolean;
  CreatedOnUtc: any;
  UpdatedOnUtc: any;
  errorMessage: string;
  errorStatus: boolean;
}

@Injectable()
export class VendorService {

  private apiUrl = environment.api + "/vendor";
  private handleError: HandleError;
  private handleSuccess: HandleSuccess;

  constructor(private http: HttpClient,
    HttpErrorHandlerService: HttpErrorHandlerService) {
    this.handleError = HttpErrorHandlerService.createHandleError('VendorService');
    this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('VendorService');
  }

  listFiltered(whereString: string): Observable<Vendor[]> {
      return this.http.get<Vendor[]>(this.apiUrl + "/listFiltered/" + whereString, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) })
      .pipe(
      map((result: any) => { return this.handleSuccess("listFiltered", result) }),
      catchError(this.handleError<Vendor[]>(`listFiltered whereString=${whereString}`))
      );
  }
  listAll(): Observable<Vendor[]> {
      return this.http.get<Vendor[]>(this.apiUrl + "/listAll", { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) })
      .pipe(
      map((result: any) => { return this.handleSuccess("listAll", result) }),
      catchError(this.handleError('listAll', []))
      );
  }
  get(id: number): Observable<Vendor> {
      return this.http.get<Vendor>(this.apiUrl + "/get/" + id, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) })
      .pipe(
      map((result: any) => { return this.handleSuccess("get", result) }),
      catchError(this.handleError<Vendor>(`get id=${id}`))
      );
  }
  create(item: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.apiUrl + "/create", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("create", result) }),
      catchError(this.handleError<Vendor>('create'))
      );
  }
  update(item: Vendor): Observable<any> {
    return this.http.post(this.apiUrl + "/update", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("update", result) }),
      catchError(this.handleError<any>('update'))
      );
  }
  delete(item: Vendor | number): Observable<Vendor> {
    const id = typeof item === 'number' ? item : item.Id;
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.post<Vendor>(url, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("delete", result) }),
      catchError(this.handleError<Vendor>('delete'))
      );
  }
}
