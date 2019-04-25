import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Employee, EmployeeService } from './services/employee.service';
import { MenuOptions, MenuoptionsService } from './services/menuoptions.service';
import { UserRolesMenuOptionsMapping, UserrolesmenuoptionsmappingService } from './services/userrolesmenuoptionsmapping.service';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private employeeService: EmployeeService, private userrolesmenuoptionsmappingService: UserrolesmenuoptionsmappingService,
        private authService: AuthService, private router: Router, private menuoptionsService: MenuoptionsService) { }

    title = 'handymanworkapp';

    public menu: UserRolesMenuOptionsMapping[] = [];
    public loggedIn: boolean = false;
    public signinForm: FormGroup = new FormGroup({
        email: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
    });
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    ngOnInit() {
        
    }
    navigateToPath(sidenav, url) {
        console.log(window.innerWidth);
        if (window.innerWidth <= 575) {
            sidenav.toggle();
        }
        this.router.navigateByUrl("/" + url);
    }
    logout(sidenav) {
        this.loggedIn = false;
        this.menu = [];
        sidenav.toggle();
        this.authService.logout();
    }
    signin(sidenav) {
        this.submitted = true;
        // stop here if form is invalid
        if (this.signinForm.invalid) {
            return;
        }
        this.loading = true;
        if (this.signinForm.valid) {
            this.authService.login(this.signinForm.controls.email.value, this.signinForm.controls.password.value)
                .subscribe((result: any) => {
                    this.loading = false;
                    this.error = "";
                    this.getUser(sidenav);
                    this.loggedIn = true;
                },
                (err: HttpErrorResponse) => {
                    this.loading = false;
                    this.error = "Invalid User";
                });
        }
        else {
            this.signinForm.controls["email"].markAsDirty();
            this.signinForm.controls["password"].markAsDirty();
        }
    }
    getUser(sidenav) {
        this.employeeService.listFiltered("Email='" + this.signinForm.controls.email.value + "'")
            .subscribe(result => {
                let emp: Employee = result[0];
                let empId: any = emp.Id;
                localStorage.setItem("UserId", empId);
                this.menuoptionsService.get(emp.DefaultMenuId)
                    .subscribe(menu => {
                        if (localStorage.getItem("UserId") != null) {
                            this.loggedIn = true;
                            let empId: any = localStorage.getItem("UserId");
                            this.employeeService.get(empId)
                                .subscribe(e => {
                                    this.userrolesmenuoptionsmappingService.listFiltered("UserRoleId=" + e.RoleId)
                                        .subscribe(menus => {
                                            this.menu = menus;
                                            if (window.innerWidth > 575) {
                                                sidenav.toggle();
                                                this.router.navigateByUrl("/" + menu.Name);
                                            }
                                        });
                                });
                        }
                        else {
                            this.loggedIn = false;
                        }
                        
                    });
            });
    }
}
