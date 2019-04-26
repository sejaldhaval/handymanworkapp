import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';
import { MenuOptions, MenuoptionsService } from '../../services/menuoptions.service';
import { UserRoles, UserrolesService } from '../../services/userroles.service';
import { Location, LocationService } from '../../services/location.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
        FirstName: new FormControl("", Validators.required),
        LastName: new FormControl(""),
        NickName: new FormControl(""),
        Mobile: new FormControl(""),
        Email: new FormControl("", Validators.required),
        Password: new FormControl("", Validators.required),
        Active: new FormControl(true),
        CreatedOnUtc: new FormControl(""),
        UpdatedOnUtc: new FormControl(""),
        RoleId: new FormControl(0, Validators.required),
        RoleName: new FormControl("", Validators.required),
        LocationId: new FormControl(0, Validators.required),
        LocationName: new FormControl("", Validators.required),
        DefaultMenuId: new FormControl(0, Validators.required),
        DefaultMenuName: new FormControl("", Validators.required),
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

    onlist() {
        $("#list").show(500);
        $("#add").hide(500);
        this.action = "";
    }

    onadd() {
        this.employeeForm.reset();
        $("#add").show(500);
        $("#list").hide(500);
        this.action = "add";
    }
    add() {
        if (this.employeeForm.valid) {
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
                    this.refreshList(r);
                });
        }
    }

    onedit(emp: Employee) {
        this.employeeForm.reset();
        this.action = "edit";
            this.employeeForm.controls["Id"].setValue(emp.Id);
            this.employeeForm.controls["FirstName"].setValue(emp.FirstName);
            this.employeeForm.controls["LastName"].setValue(emp.LastName);
            this.employeeForm.controls["NickName"].setValue(emp.NickName);
            this.employeeForm.controls["Mobile"].setValue(emp.Mobile);
            this.employeeForm.controls["Email"].setValue(emp.Email);
            this.employeeForm.controls["Password"].setValue(emp.Password);
            this.employeeForm.controls["Active"].setValue(emp.Active);
            this.employeeForm.controls["CreatedOnUtc"].setValue(emp.CreatedOnUtc);
            this.employeeForm.controls["UpdatedOnUtc"].setValue(emp.UpdatedOnUtc);
            this.employeeForm.controls["RoleId"].setValue(emp.RoleId);
            this.employeeForm.controls["RoleName"].setValue(emp.RoleName);
            this.employeeForm.controls["LocationId"].setValue(emp.LocationId);
            this.employeeForm.controls["LocationName"].setValue(emp.LocationName);
            this.employeeForm.controls["DefaultMenuId"].setValue(emp.DefaultMenuId);
            this.employeeForm.controls["DefaultMenuName"].setValue(emp.DefaultMenuName);
            this.employeeForm.controls["DefaultMenuComponent"].setValue(emp.DefaultMenuComponent);
            this.employeeForm.controls["errorMessage"].setValue(emp.errorMessage);
            this.employeeForm.controls["errorStatus"].setValue(emp.errorStatus);
            $("#add").show(500);
            $("#list").hide(500);
    }
    edit() {
        if (this.employeeForm.valid) {
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
                    this.refreshList(item);
                });
        }
    }

    ondelete(emp: Employee) {
        this.action = "delete";
        this.employeeForm.controls["Id"].setValue(emp.Id);
        this.employeeForm.controls["FirstName"].setValue(emp.FirstName);
        $("#EmployeeModal").modal("show");
    }
    delete() {
        $("#EmployeeModal").modal("hide");
        if (this.employeeForm.controls["Id"].value != null && this.employeeForm.controls["Id"].value != 0 && this.employeeForm.controls["Id"].value != undefined) {
            this.employeeService.delete(this.employeeForm.controls["Id"].value)
                .subscribe(r => {
                    this.refreshList(null);
                });
        }
    }

    refreshList(r: Employee) {
        if (this.action == "add") {
            this.employees.splice(0, 0, r);
        }
        if (this.action == "edit") {
            this.employees.forEach((item, index) => {
                if (item.Id == r.Id) {
                    this.employees.splice(index, 1, r);
                }
            });
        }
        if (this.action == "delete") {
            this.employees.forEach((item, index) => {
                if (item.Id == this.employeeForm.controls["Id"].value) {
                    this.employees.splice(index, 1);
                }
            });
        }
    }
}
