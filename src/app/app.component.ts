import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Employee, EmployeeService } from './services/employee.service';
import { UserRolesMenuOptionsMapping, UserrolesmenuoptionsmappingService } from './services/userrolesmenuoptionsmapping.service';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private employeeService: EmployeeService, private userrolesmenuoptionsmappingService: UserrolesmenuoptionsmappingService, private authService: AuthService, private router: Router) { }

    title = 'handymanworkapp';
    public menu: UserRolesMenuOptionsMapping[] = [];

    ngOnInit(): void {
        if (localStorage.getItem("UserId") != null) {
            let empId: any = localStorage.getItem("UserId");
            this.employeeService.get(empId)
                .subscribe(e => {
                    this.userrolesmenuoptionsmappingService.listFiltered("UserRoleId=" + e.RoleId)
                        .subscribe(menus => {
                            this.menu = menus;
                        });
                });
        }
    }
    navigateToPath(sidenav, url) {
        console.log(window.innerWidth);
        if (window.innerWidth <= 575) {
            sidenav.toggle();
        }
        this.router.navigateByUrl("/" + url);
    }
    logout(sidenav) {
        this.menu = [];
        sidenav.toggle();
        this.authService.logout();
    }
}
