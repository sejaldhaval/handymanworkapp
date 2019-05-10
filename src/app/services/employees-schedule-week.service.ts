import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from '../http-error-handler.service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class EmployeeScheduleWeek {
    Id: number;
    EmployeeScheduleId: number;
    MondayIn: string;
    MondayOut: string;
    TuesdayIn: string;
    TuesdayOut: string;
    WednesdayIn: string;
    WednesdayOut: string;
    ThursdayIn: string;
    ThursdayOut: string;
    FridayIn: string;
    FridayOut: string;
    SaturdayIn: string;
    SaturdayOut: string;
    SundayIn: string;
    SundayOut: string;
    CreatedOnUtc?: any;
    UpdatedOnUtc?: any
    errorMessage?: string;
    errorStatus?: boolean;
}

@Injectable()
export class EmployeeScheduleWeekService {

    private apiUrl = environment.api + "/employeescheduleweek";
    private handleError: HandleError;
    private handleSuccess: HandleSuccess;

    constructor(private http: HttpClient,
        HttpErrorHandlerService: HttpErrorHandlerService) {
        this.handleError = HttpErrorHandlerService.createHandleError('EmployeeScheduleWeekService');
        this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('EmployeeScheduleWeekService');
    }

    listFiltered(whereString: string): Observable<EmployeeScheduleWeek[]> {
        return this.http.get<EmployeeScheduleWeek[]>(this.apiUrl + "/listFiltered/" + whereString, httpOptions)
            .pipe(
            map((result: any) => { return this.handleSuccess("listFiltered", result) }),
            catchError(this.handleError<EmployeeScheduleWeek[]>(`listFiltered wherestring=${whereString}`))
            );
    }
    listAll(): Observable<EmployeeScheduleWeek[]> {
        return this.http.get<EmployeeScheduleWeek[]>(this.apiUrl + "/listAll", httpOptions)
            .pipe(
            map((result: any) => { return this.handleSuccess("listAll", result) }),
            catchError(this.handleError('listAll', []))
            );
    }
    get(id: number): Observable<EmployeeScheduleWeek> {
        return this.http.get<EmployeeScheduleWeek>(this.apiUrl + "/get/" + id, httpOptions)
            .pipe(
            map((result: any) => { return this.handleSuccess("get", result) }),
            catchError(this.handleError<EmployeeScheduleWeek>(`get id=${id}`))
            );
    }
    create(item: EmployeeScheduleWeek): Observable<EmployeeScheduleWeek> {
        return this.http.post<EmployeeScheduleWeek>(this.apiUrl + "/create", item, httpOptions)
            .pipe(
            map((result: any) => { return this.handleSuccess("create", result) }),
            catchError(this.handleError<EmployeeScheduleWeek>('create'))
            );
    }
    update(item: EmployeeScheduleWeek): Observable<any> {
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
