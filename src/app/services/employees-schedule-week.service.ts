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
    MondayIn1: string;
    MondayOut1: string;
    MondayIn2: string;
    MondayOut2: string;
    TuesdayIn1: string;
    TuesdayOut1: string;
    TuesdayIn2: string;
    TuesdayOut2: string;
    WednesdayIn1: string;
    WednesdayOut1: string;
    WednesdayIn2: string;
    WednesdayOut2: string;
    ThursdayIn1: string;
    ThursdayOut1: string;
    ThursdayIn2: string;
    ThursdayOut2: string;
    FridayIn1: string;
    FridayOut1: string;
    FridayIn2: string;
    FridayOut2: string;
    SaturdayIn1: string;
    SaturdayOut1: string;
    SaturdayIn2: string;
    SaturdayOut2: string;
    SundayIn1: string;
    SundayOut1: string;
    SundayIn2: string;
    SundayOut2: string;
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
