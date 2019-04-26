import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        if (req.headers.get('No-Auth') == "True") {
            return next.handle(req.clone());
        }
        else {
            if (localStorage.getItem("userToken") != null) {
                const clonereq = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem("userToken"))
                });
                console.log(clonereq);
                return next.handle(clonereq)
                    .pipe(
                    map((result: any) => {
                        return result;
                    }),
                    catchError((err: any) => {
                        this.router.navigateByUrl("/Home");
                        return err;
                    })
                    );
            }
            else {
                this.router.navigateByUrl("/Home");
            }
        }
    }
}
