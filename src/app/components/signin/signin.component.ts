import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first, map, catchError } from 'rxjs/operators';

import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

import { Employee, EmployeeService } from '../../services/employee.service';
import { MenuOptions, MenuoptionsService } from '../../services/menuoptions.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private employeeService: EmployeeService, private menuoptionsService: MenuoptionsService) {
        //if (this.authService.currentUserValue) {
        //    this.router.navigate(['/']);
        //}
    }

    public signinForm: FormGroup = new FormGroup({
        email: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
    });
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    signin() {
        
        this.submitted = true;

        // stop here if form is invalid
        if (this.signinForm.invalid) {
            return;
        }
        this.loading = true;
        if (this.signinForm.valid) {
            this.authService.login(this.signinForm.controls.email.value, this.signinForm.controls.password.value)
                .subscribe((result: any) => {
                    localStorage.setItem("userToken", result.access_token);
                    this.loading = false;
                    this.error = "";
                    this.employeeService.listFiltered("Email='" + this.signinForm.controls.email.value + "'")
                        .subscribe(result => {
                            let emp: Employee = result[0];
                            let empId: any = emp.Id;
                            localStorage.setItem("UserId", empId);
                            this.menuoptionsService.get(emp.DefaultMenuId)
                                .subscribe(menu => {
                                    this.router.navigateByUrl("/" + menu.Name);
                                });
                        });
                },
                (err: HttpErrorResponse) => {
                    this.loading = false;
                    this.error = "Invalid User";
                }
            )
        }
        else {
            this.signinForm.controls["email"].markAsDirty();
            this.signinForm.controls["password"].markAsDirty();
        }
    }

}
