import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';
import { MenuOptions, MenuoptionsService } from '../../services/menuoptions.service';
import { UserRoles, UserrolesService } from '../../services/userroles.service';
import { Location, LocationService } from '../../services/location.service';
import { FormGroup, FormControl } from '@angular/forms';
declare var $: any;

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

    constructor(private employeeService: EmployeeService, private menuoptionsService: MenuoptionsService, private userrolesService: UserrolesService, private locationService: LocationService) { }

    employees: Employee[] = [];
    roles: UserRoles[] = [];
    locations: Location[] = [];
    menus: MenuOptions[] = [];
    action: string = "";
    public employeeForm: FormGroup = new FormGroup({
        Id: new FormControl(0),
        FirstName: new FormControl(""),
        LastName: new FormControl(""),
        NickName: new FormControl(""),
        Mobile: new FormControl(""),
        Email: new FormControl(""),
        Password: new FormControl(""),
        Active: new FormControl(true),
        CreatedOnUtc: new FormControl(""),
        UpdatedOnUtc: new FormControl(""),
        RoleId: new FormControl(0),
        RoleName: new FormControl(""),
        LocationId: new FormControl(0),
        LocationName: new FormControl(""),
        DefaultMenuId: new FormControl(0),
        DefaultMenuName: new FormControl(""),
        DefaultMenuComponent: new FormControl(""),
        errorMessage: new FormControl(""),
        errorStatus: new FormControl(false),
    });

    ngOnInit() {
        this.employeeService.listAll()
            .subscribe(r => {
                this.employees = r;
            });
        this.userrolesService.listAll()
            .subscribe(r => {
                this.roles = r;
            });
        this.locationService.listAll()
            .subscribe(r => {
                this.locations = r;
            });
        this.menuoptionsService.listAll()
            .subscribe(r => {
                this.menus = r;
            });
    }

    onadd() {
        $("#add").show(500);
        $("#list").hide(500);
        this.action = "add";
    }
    onlist() {
        $("#list").show(500);
        $("#add").hide(500);
        this.action = "";
    }

    add() {
        let item: Employee = {
            Id: this.employeeForm.controls["Id"].value,
            FirstName: this.employeeForm.controls["FirstName"].value,
            LastName: this.employeeForm.controls["LastName"].value,
            NickName: this.employeeForm.controls["NickName"].value,
            Mobile: this.employeeForm.controls["Mobile"].value,
            Email: this.employeeForm.controls["EmailId"].value,
            Password: this.employeeForm.controls["Password"].value,
            Active: this.employeeForm.controls["Active"].value,
            CreatedOnUtc: this.employeeForm.controls["CreatedOnUtc"].value,
            UpdatedOnUtc: this.employeeForm.controls["UpdatedOnUtc"].value,
            RoleId: this.employeeForm.controls["RoleId"].value,
            RoleName: this.employeeForm.controls["RoleName"].value,
            LocationId: this.employeeForm.controls["LocationId"].value,
            LocationName: this.employeeForm.controls["LocationName"].value,
            DefaultMenuId: this.employeeForm.controls["DefaultMenuId"].value,
            DefaultMenuName: this.employeeForm.controls["DefaultMenuName"].value,
            DefaultMenuComponent: this.employeeForm.controls["DefaultMenuComponent"].value,
            errorMessage: this.employeeForm.controls["errorMessage"].value,
            errorStatus: this.employeeForm.controls["errorStatus"].value,
        };
        this.employeeService.update(item)
            .subscribe(r => {
                this.employees.splice(0, 0, r);
            });
    }

    onedit(emp) {
        this.action = "edit";
       //form.controls.value = emp.value
    }
    edit() {
        let item: Employee = {
            Id: this.employeeForm.controls["Id"].value,
            FirstName: this.employeeForm.controls["FirstName"].value,
            LastName: this.employeeForm.controls["LastName"].value,
            NickName: this.employeeForm.controls["NickName"].value,
            Mobile: this.employeeForm.controls["Mobile"].value,
            Email: this.employeeForm.controls["EmailId"].value,
            Password: this.employeeForm.controls["Password"].value,
            Active: this.employeeForm.controls["Active"].value,
            CreatedOnUtc: this.employeeForm.controls["CreatedOnUtc"].value,
            UpdatedOnUtc: this.employeeForm.controls["UpdatedOnUtc"].value,
            RoleId: this.employeeForm.controls["RoleId"].value,
            RoleName: this.employeeForm.controls["RoleName"].value,
            LocationId: this.employeeForm.controls["LocationId"].value,
            LocationName: this.employeeForm.controls["LocationName"].value,
            DefaultMenuId: this.employeeForm.controls["DefaultMenuId"].value,
            DefaultMenuName: this.employeeForm.controls["DefaultMenuName"].value,
            DefaultMenuComponent: this.employeeForm.controls["DefaultMenuComponent"].value,
            errorMessage: this.employeeForm.controls["errorMessage"].value,
            errorStatus: this.employeeForm.controls["errorStatus"].value,
        };
        this.employeeService.create(item)
            .subscribe(r => {
                this.employees.forEach((item, index) => {
                    if (item.Id == r.Id) {
                        this.employees.splice(index, 1, r);
                    }
                });
            });
    }

    ondelete(item) {
        this.action = "delete";
    }
    delete() { }

}
