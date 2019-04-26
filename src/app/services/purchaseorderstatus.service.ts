import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class PurchaseOrderStatus {
  Id: number;
  Name: string;
  CreatedOnUtc: any;
  UpdatedOnUtc: any;
  errorMessage: string;
  errorStatus: boolean;
}

@Injectable()
export class PurchaseorderstatusService {

  private apiUrl = environment.api + "/purchaseorderstatus";
  private handleError: HandleError;
  private handleSuccess: HandleSuccess;

  constructor(private http: HttpClient,
    HttpErrorHandlerService: HttpErrorHandlerService) {
    this.handleError = HttpErrorHandlerService.createHandleError('PurchaseOrderStatusService');
    this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('PurchaseOrderStatusService');
  }

  listFiltered(whereString: string): Observable<PurchaseOrderStatus[]> {
      return this.http.get<PurchaseOrderStatus[]>(this.apiUrl + "/listFiltered/" + whereString, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listFiltered", result) }),
      catchError(this.handleError<PurchaseOrderStatus[]>(`listFiltered whereString=${whereString}`))
      );
  }
  listAll(): Observable<PurchaseOrderStatus[]> {
      return this.http.get<PurchaseOrderStatus[]>(this.apiUrl + "/listAll", httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listAll", result) }),
      catchError(this.handleError('listAll', []))
      );
  }
  get(id: number): Observable<PurchaseOrderStatus> {
      return this.http.get<PurchaseOrderStatus>(this.apiUrl + "/get/" + id, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("get", result) }),
      catchError(this.handleError<PurchaseOrderStatus>(`get id=${id}`))
      );
  }
  create(item: PurchaseOrderStatus): Observable<PurchaseOrderStatus> {
    return this.http.post<PurchaseOrderStatus>(this.apiUrl + "/create", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("create", result) }),
      catchError(this.handleError<PurchaseOrderStatus>('create'))
      );
  }
  update(item: PurchaseOrderStatus): Observable<any> {
    return this.http.post(this.apiUrl + "/update", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("update", result) }),
      catchError(this.handleError<any>('update'))
      );
  }
  delete(item: PurchaseOrderStatus | number): Observable<PurchaseOrderStatus> {
    const id = typeof item === 'number' ? item : item.Id;
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.post<PurchaseOrderStatus>(url, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("delete", result) }),
      catchError(this.handleError<PurchaseOrderStatus>('delete'))
      );
  }
}
