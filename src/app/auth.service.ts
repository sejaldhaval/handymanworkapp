import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorHandlerService, HandleError, HandleSuccess } from './http-error-handler.service';
import { environment } from '../environments/environment';
import { Employee } from './services/employee.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = environment.token;
    private handleError: HandleError;
    private handleSuccess: HandleSuccess;


    constructor(private http: HttpClient, private router: Router,
        HttpErrorHandlerService: HttpErrorHandlerService) {
        this.handleError = HttpErrorHandlerService.createHandleError('AuthService');
        this.handleSuccess = HttpErrorHandlerService.createHandleSuccess('AuthService');
    }

    login(email: string, password: string): Observable<any> {
        var item = "username=" + email + "&password=" + password + "&grant_type=password";
        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', "No-Auth": 'True' });
        return this.http.post<any>(this.apiUrl, item, { headers: reqHeader })
            .pipe(
            map((result: any) => {
                localStorage.setItem("userToken", result.access_token);
                return result;
            }),
            catchError(this.handleError<any>('validateFile'))
        );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('userToken');
        localStorage.removeItem('UserId');
        this.router.navigateByUrl("/Home");
    }
}
