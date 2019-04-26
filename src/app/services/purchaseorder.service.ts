import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class PurchaseOrder {
  Id: number;
  ItemId: number;
  ItemName: string;
  VendorId: number;
  VendorName: string;
  Active: boolean;
  Quantity: number;
  PurchaseOrderStatus: number;
  CreatedOnUtc: any;
  UpdatedOnUtc: any;
  errorMessage: string;
  errorStatus: boolean;
}

@Injectable()
export class PurchaseorderService {

  private apiUrl = environment.api + "/purchaseorder";
  private handleError: HandleError;
  private handleSuccess: HandleSuccess;

  constructor(private http: HttpClient,
    HttpErrorHandlerService: HttpErrorHandlerService) {
    this.handleError = HttpErrorHandlerService.createHandleError('PurchaseOrderService');
    this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('PurchaseOrderService');
  }

  listFiltered(whereString: string): Observable<PurchaseOrder[]> {
      return this.http.get<PurchaseOrder[]>(this.apiUrl + "/listFiltered/" + whereString, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listFiltered", result) }),
      catchError(this.handleError<PurchaseOrder[]>(`listFiltered whereString=${whereString}`))
      );
  }
  listAll(): Observable<PurchaseOrder[]> {
      return this.http.get<PurchaseOrder[]>(this.apiUrl + "/listAll", httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listAll", result) }),
      catchError(this.handleError('listAll', []))
      );
  }
  get(id: number): Observable<PurchaseOrder> {
      return this.http.get<PurchaseOrder>(this.apiUrl + "/get/" + id, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("get", result) }),
      catchError(this.handleError<PurchaseOrder>(`get id=${id}`))
      );
  }
  create(item: PurchaseOrder): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(this.apiUrl + "/create", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("create", result) }),
      catchError(this.handleError<PurchaseOrder>('create'))
      );
  }
  update(item: PurchaseOrder): Observable<any> {
    return this.http.post(this.apiUrl + "/update", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("update", result) }),
      catchError(this.handleError<any>('update'))
      );
  }
  delete(item: PurchaseOrder | number): Observable<PurchaseOrder> {
    const id = typeof item === 'number' ? item : item.Id;
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.post<PurchaseOrder>(url, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("delete", result) }),
      catchError(this.handleError<PurchaseOrder>('delete'))
      );
  }
}
