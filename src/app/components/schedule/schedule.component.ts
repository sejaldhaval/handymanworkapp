import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';
import { EmployeeSchedule, EmployeeScheduleService } from '../../services/employees-schedule.service';
import { EmployeeScheduleWeek, EmployeeScheduleWeekService } from '../../services/employees-schedule-week.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

    constructor(private employeeService: EmployeeService, private employeeScheduleService: EmployeeScheduleService, private employeeScheduleWeekService: EmployeeScheduleWeekService) { }
    public employeeId: number = 0;
    public startDate: string = "";
    public endDate: string = "";
    public employeeScheduleList: EmployeeSchedule;
    public eswl: any = {
        Id: 0,
        EmployeeScheduleId: 0,
        MondayIn: "",
        MondayOut: "",
        MondayHours: "",
        TuesdayIn: "",
        TuesdayOut: "",
        TuesdayHours: "",
        WednesdayIn: "",
        WednesdayOut: "",
        WednesdayHours: "",
        ThursdayIn: "",
        ThursdayOut: "",
        ThursdayHours: "",
        FridayIn: "",
        FridayOut: "",
        FridayHours: "",
        SaturdayIn: "",
        SaturdayOut: "",
        SaturdayHours: "",
        SundayIn: "",
        SundayOut: "",
        SundayHours: ""
    };
    public isScheduleAvailable = false;
    public isScheduleWeekAvailable = false;
    public dateError: string = "";

    public scheduleForm: FormGroup = new FormGroup({
        Id: new FormControl(0),
        EmployeeId: new FormControl(0, Validators.required),
        StartDate: new FormControl("", Validators.required),
        EndDate: new FormControl("", Validators.required),
    }, { validators: this.dateLessThan('StartDate', 'EndDate') });


    dateLessThan(from: string, to: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let f = group.controls[from];
            let t = group.controls[to];
            if (f.value > t.value) {
                return {
                    dates: "StartDate should be less than EndDate"
                };
            }
            return {};
        }
    }

    calHours() {
      
        //if (this.eswl.MondayOut != "" && this.eswl.MondayOut != null && this.eswl.MondayIn != "" && this.eswl.MondayIn != null) {
        //    this.eswl.MondayHours = this.eswl.MondayOut - this.eswl.MondayIn;
        //}
        //let intime: Date = new Date(this.eswl.MondayIn);
        //let outtime = new Date(this.eswl.MondayOut);
        console.log(Date.parse(this.eswl.MondayIn));
    }

    ngOnInit() {
        this.employeeService.listFiltered("Active=1")
            .subscribe(r => {
                this.employees = r;
            });

    }

    public employees: Employee[];

    save() {

    }
    reset() {

    }
    getEmployeeSchedule() {
        if (this.scheduleForm.controls.EmployeeId.value != 0) {
            this.employeeScheduleService.listFiltered("EmployeeId=" + this.scheduleForm.controls.EmployeeId.value)
                .subscribe(r => {
                    this.employeeScheduleList = r[0];
                    if (this.employeeScheduleList) {
                        this.isScheduleAvailable = true;
                        this.scheduleForm.controls.Id.setValue(this.employeeScheduleList.Id);
                        this.scheduleForm.controls.StartDate.setValue(this.employeeScheduleList.StartDate.split('T')[0]);
                        this.scheduleForm.controls.EndDate.setValue(this.employeeScheduleList.EndDate.split('T')[0]);
                        var employeeScheduleId = this.employeeScheduleList.Id;
                        this.getEmployeeScheduleWeek(employeeScheduleId);
                    }
                    else {
                        this.isScheduleAvailable = false;
                    }
                });
        }
    }

    addSchedule() {
        if (this.scheduleForm.valid) {
            let item: EmployeeSchedule = {
                Id: 0,
                EmployeeId: this.scheduleForm.controls.EmployeeId.value,
                StartDate: this.scheduleForm.controls.StartDate.value,
                EndDate: this.scheduleForm.controls.EndDate.value
            }
            this.employeeScheduleService.create(item)
                .subscribe(r => {
                    var employeeScheduleId = r.Id;
                    this.getEmployeeScheduleWeek(employeeScheduleId);
                });
        }
    }

    getEmployeeScheduleWeek(employeeScheduleId) {
        this.employeeScheduleWeekService.listFiltered("EmployeeScheduleId=" + employeeScheduleId)
            .subscribe(s => {
                if (s[0]) {
                    this.isScheduleWeekAvailable = true;
                    this.eswl = s[0];
                }
                else {
                    this.isScheduleWeekAvailable = true;
                    let itemj: EmployeeScheduleWeek = {
                        Id: 0,
                        EmployeeScheduleId: employeeScheduleId,
                        MondayIn: "",
                        MondayOut: "",
                        TuesdayIn: "",
                        TuesdayOut: "",
                        WednesdayIn: "",
                        WednesdayOut: "",
                        ThursdayIn: "",
                        ThursdayOut: "",
                        FridayIn: "",
                        FridayOut: "",
                        SaturdayIn: "",
                        SaturdayOut: "",
                        SundayIn: "",
                        SundayOut: ""
                    }
                    this.employeeScheduleWeekService.create(itemj)
                        .subscribe(t => {
                            this.eswl = t;
                        });
                }
            });
    }
}
