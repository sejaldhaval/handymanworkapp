import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class MaintenanceServiceImages {
  Id: number;
  MaintenanceServiceId: number;
  Image: any;
  errorMessage: string;
  errorStatus: boolean;
}

@Injectable()
export class MaintenanceserviceimagesService {

  private apiUrl = environment.api + "/maintenanceserviceimages";
  private handleError: HandleError;
  private handleSuccess: HandleSuccess;

  constructor(private http: HttpClient,
    HttpErrorHandlerService: HttpErrorHandlerService) {
    this.handleError = HttpErrorHandlerService.createHandleError('MaintenanceServiceImagesService');
    this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('MaintenanceServiceImagesService');
  }

  listFiltered(whereString: string): Observable<MaintenanceServiceImages[]> {
      return this.http.get<MaintenanceServiceImages[]>(this.apiUrl + "/listFiltered/" + whereString, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listFiltered", result) }),
      catchError(this.handleError<MaintenanceServiceImages[]>(`listFiltered whereString=${whereString}`))
      );
  }
  listAll(): Observable<MaintenanceServiceImages[]> {
      return this.http.get<MaintenanceServiceImages[]>(this.apiUrl + "/listAll", httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("listAll", result) }),
      catchError(this.handleError('listAll', []))
      );
  }
  get(id: number): Observable<MaintenanceServiceImages> {
      return this.http.get<MaintenanceServiceImages>(this.apiUrl + "/get/" + id, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("get", result) }),
      catchError(this.handleError<MaintenanceServiceImages>(`get id=${id}`))
      );
  }
  create(item: MaintenanceServiceImages): Observable<MaintenanceServiceImages> {
    return this.http.post<MaintenanceServiceImages>(this.apiUrl + "/create", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("create", result) }),
      catchError(this.handleError<MaintenanceServiceImages>('create'))
      );
  }
  update(item: MaintenanceServiceImages): Observable<any> {
    return this.http.post(this.apiUrl + "/update", item, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("update", result) }),
      catchError(this.handleError<any>('update'))
      );
  }
  delete(item: MaintenanceServiceImages | number): Observable<MaintenanceServiceImages> {
    const id = typeof item === 'number' ? item : item.Id;
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.post<MaintenanceServiceImages>(url, httpOptions)
      .pipe(
      map((result: any) => { return this.handleSuccess("delete", result) }),
      catchError(this.handleError<MaintenanceServiceImages>('delete'))
      );
  }
}
