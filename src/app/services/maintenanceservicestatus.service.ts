import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class MaintenanceServiceStatus {
    Id: number;
    MaintenanceServiceId: number;
    Comment: any;
    CreatedById: number;
    CreatedByName: string;
    CreatedOnUtc: string;
    UpdatedOnUtc: string;
    errorMessage: string;
    errorStatus: boolean;
}

@Injectable()
export class MaintenanceservicestatusService {

    private apiUrl = environment.api + "/maintenanceservicestatus";
    private handleError: HandleError;
    private handleSuccess: HandleSuccess;

    constructor(private http: HttpClient,
        HttpErrorHandlerService: HttpErrorHandlerService) {
        this.handleError = HttpErrorHandlerService.createHandleError('MaintenanceServiceStatusService');
        this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('MaintenanceServiceStatusService');
    }

    listFiltered(whereString: string): Observable<MaintenanceServiceStatus[]> {
        return this.http.get<MaintenanceServiceStatus[]>(this.apiUrl + "/listFiltered/" + whereString, httpOptions)
            .pipe(
            map((result: any) => { return this.handleSuccess("listFiltered", result) }),
            catchError(this.handleError<MaintenanceServiceStatus[]>(`listFiltered whereString=${whereString}`))
            );
    }
    listAll(): Observable<MaintenanceServiceStatus[]> {
        return this.http.get<MaintenanceServiceStatus[]>(this.apiUrl + "/listAll", httpOptions)
            .pipe(
            map((result: any) => { return this.handleSuccess("listAll", result) }),
            catchError(this.handleError('listAll', []))
            );
    }
    get(id: number): Observable<MaintenanceServiceStatus> {
        return this.http.get<MaintenanceServiceStatus>(this.apiUrl + "/get/" + id, httpOptions)
            .pipe(
            map((result: any) => { return this.handleSuccess("get", result) }),
            catchError(this.handleError<MaintenanceServiceStatus>(`get id=${id}`))
            );
    }
    create(item: MaintenanceServiceStatus): Observable<MaintenanceServiceStatus> {
        return this.http.post<MaintenanceServiceStatus>(this.apiUrl + "/create", item, httpOptions)
            .pipe(
            map((result: any) => { return this.handleSuccess("create", result) }),
            catchError(this.handleError<MaintenanceServiceStatus>('create'))
            );
    }
    update(item: MaintenanceServiceStatus): Observable<any> {
        return this.http.post(this.apiUrl + "/update", item, httpOptions)
            .pipe(
            map((result: any) => { return this.handleSuccess("update", result) }),
            catchError(this.handleError<any>('update'))
            );
    }
    delete(item: MaintenanceServiceStatus | number): Observable<MaintenanceServiceStatus> {
        const id = typeof item === 'number' ? item : item.Id;
        const url = `${this.apiUrl}/delete/${id}`;
        return this.http.post<MaintenanceServiceStatus>(url, httpOptions)
            .pipe(
            map((result: any) => { return this.handleSuccess("delete", result) }),
            catchError(this.handleError<MaintenanceServiceStatus>('delete'))
            );
    }
}
