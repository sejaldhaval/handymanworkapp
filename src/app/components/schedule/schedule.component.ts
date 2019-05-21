import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';
import { EmployeeSchedule, EmployeeScheduleService } from '../../services/employees-schedule.service';
import { EmployeeScheduleWeek, EmployeeScheduleWeekService } from '../../services/employees-schedule-week.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent, Subscription, Subject } from 'rxjs';
import Chart from 'chart.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrid from '@fullcalendar/timegrid';


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
        MondayIn1: { hour: 0, minute: 0, second: 0 },
        MondayOut1: { hour: 0, minute: 0, second: 0 },
        MondayIn2: { hour: 0, minute: 0, second: 0 },
        MondayOut2: { hour: 0, minute: 0, second: 0 },
        MondayHours: 0,
        TuesdayIn1: { hour: 0, minute: 0, second: 0 },
        TuesdayOut1: { hour: 0, minute: 0, second: 0 },
        TuesdayIn2: { hour: 0, minute: 0, second: 0 },
        TuesdayOut2: { hour: 0, minute: 0, second: 0 },
        TuesdayHours: 0,
        WednesdayIn1: { hour: 0, minute: 0, second: 0 },
        WednesdayOut1: { hour: 0, minute: 0, second: 0 },
        WednesdayIn2: { hour: 0, minute: 0, second: 0 },
        WednesdayOut2: { hour: 0, minute: 0, second: 0 },
        WednesdayHours: 0,
        ThursdayIn1: { hour: 0, minute: 0, second: 0 },
        ThursdayOut1: { hour: 0, minute: 0, second: 0 },
        ThursdayIn2: { hour: 0, minute: 0, second: 0 },
        ThursdayOut2: { hour: 0, minute: 0, second: 0 },
        ThursdayHours: 0,
        FridayIn1: { hour: 0, minute: 0, second: 0 },
        FridayOut1: { hour: 0, minute: 0, second: 0 },
        FridayIn2: { hour: 0, minute: 0, second: 0 },
        FridayOut2: { hour: 0, minute: 0, second: 0 },
        FridayHours: 0,
        SaturdayIn1: { hour: 0, minute: 0, second: 0 },
        SaturdayOut1: { hour: 0, minute: 0, second: 0 },
        SaturdayIn2: { hour: 0, minute: 0, second: 0 },
        SaturdayOut2: { hour: 0, minute: 0, second: 0 },
        SaturdayHours: 0,
        SundayIn1: { hour: 0, minute: 0, second: 0 },
        SundayOut1: { hour: 0, minute: 0, second: 0 },
        SundayIn2: { hour: 0, minute: 0, second: 0 },
        SundayOut2: { hour: 0, minute: 0, second: 0 },
        SundayHours: 0,
        TotalHours: 0
    };
    public isScheduleAvailable = false;
    public isScheduleWeekAvailable = false;
    public dateError: string = "";
    private subscription: Subscription;
    public calendarPlugins = [timeGrid];
    visibleRange = {
        start: '',
        end:''
    };

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

    calDayHours(day: string) {

        console.log(this.eswl);

        var M1h = 0, M2h = 0;
        var dayIn1 = day + "In1", dayOut1 = day + "Out1", dayIn2 = day + "In2", dayOut2 = day + "Out2", dayHours = day + "Hours";

        //if ((this.eswl[dayIn1] != null) && (this.eswl[dayOut1] != null)) {
        M1h = (((this.eswl[dayOut1].hour * 60) + this.eswl[dayOut1].minute) - ((this.eswl[dayIn1].hour * 60) + this.eswl[dayIn1].minute)) / 60;
        if (M2h == 0) {
            this.eswl[dayHours] = M1h;
        }
        //}
        //if (this.eswl[dayIn2] != null && this.eswl[dayOut2] != null) {
        M2h = (((this.eswl[dayOut2].hour * 60) + this.eswl[dayOut2].minute) - ((this.eswl[dayIn2].hour * 60) + this.eswl[dayIn2].minute)) / 60;
        if (M1h == 0) {
            this.eswl[dayHours] = M2h;
        }
        //}
        //if (this.eswl[dayIn1] != null && this.eswl[dayOut1] != null && this.eswl[dayIn2] != null && this.eswl[dayOut2] != null) {
        this.eswl[dayHours] = parseFloat(M1h + M2h).toFixed(2);
        //}
        this.calTotalHours();
    }

    calTotalHours() {
        this.eswl.TotalHours = parseFloat(this.eswl.MondayHours) + parseFloat(this.eswl.TuesdayHours) + parseFloat(this.eswl.WednesdayHours) + parseFloat(this.eswl.ThursdayHours) + parseFloat(this.eswl.FridayHours) +
            parseFloat(this.eswl.SaturdayHours) + parseFloat(this.eswl.SundayHours);
    }

    ngOnInit() {
        this.employeeService.listFiltered("Active=1")
            .subscribe(r => {
                this.employees = r;
            });

    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public employees: Employee[];

    save() {
        let itemj: EmployeeScheduleWeek = {
            Id: this.eswl.Id,
            EmployeeScheduleId: this.eswl.EmployeeScheduleId,
            MondayIn1: this.eswl.MondayIn1.hour + ":" + this.eswl.MondayIn1.minute,
            MondayOut1: this.eswl.MondayOut1.hour + ":" + this.eswl.MondayOut1.minute,
            MondayIn2: this.eswl.MondayIn2.hour + ":" + this.eswl.MondayIn2.minute,
            MondayOut2: this.eswl.MondayOut2.hour + ":" + this.eswl.MondayOut2.minute,
            TuesdayIn1: this.eswl.TuesdayIn1.hour + ":" + this.eswl.TuesdayIn1.minute,
            TuesdayOut1: this.eswl.TuesdayOut1.hour + ":" + this.eswl.TuesdayOut1.minute,
            TuesdayIn2: this.eswl.TuesdayIn2.hour + ":" + this.eswl.TuesdayIn2.minute,
            TuesdayOut2: this.eswl.TuesdayOut2.hour + ":" + this.eswl.TuesdayOut2.minute,
            WednesdayIn1: this.eswl.WednesdayIn1.hour + ":" + this.eswl.WednesdayIn1.minute,
            WednesdayOut1: this.eswl.WednesdayOut1.hour + ":" + this.eswl.WednesdayOut1.minute,
            WednesdayIn2: this.eswl.WednesdayIn2.hour + ":" + this.eswl.WednesdayIn2.minute,
            WednesdayOut2: this.eswl.WednesdayOut2.hour + ":" + this.eswl.WednesdayOut2.minute,
            ThursdayIn1: this.eswl.ThursdayIn1.hour + ":" + this.eswl.ThursdayIn1.minute,
            ThursdayOut1: this.eswl.ThursdayOut1.hour + ":" + this.eswl.ThursdayOut1.minute,
            ThursdayIn2: this.eswl.ThursdayIn2.hour + ":" + this.eswl.ThursdayIn2.minute,
            ThursdayOut2: this.eswl.ThursdayOut2.hour + ":" + this.eswl.ThursdayOut2.minute,
            FridayIn1: this.eswl.FridayIn1.hour + ":" + this.eswl.FridayIn1.minute,
            FridayOut1: this.eswl.FridayOut1.hour + ":" + this.eswl.FridayOut1.minute,
            FridayIn2: this.eswl.FridayIn2.hour + ":" + this.eswl.FridayIn2.minute,
            FridayOut2: this.eswl.FridayOut2.hour + ":" + this.eswl.FridayOut2.minute,
            SaturdayIn1: this.eswl.SaturdayIn1.hour + ":" + this.eswl.SaturdayIn1.minute,
            SaturdayOut1: this.eswl.SaturdayOut1.hour + ":" + this.eswl.SaturdayOut1.minute,
            SaturdayIn2: this.eswl.SaturdayIn2.hour + ":" + this.eswl.SaturdayIn2.minute,
            SaturdayOut2: this.eswl.SaturdayOut2.hour + ":" + this.eswl.SaturdayOut2.minute,
            SundayIn1: this.eswl.SundayIn1.hour + ":" + this.eswl.SundayIn1.minute,
            SundayOut1: this.eswl.SundayOut1.hour + ":" + this.eswl.SundayOut1.minute,
            SundayIn2: this.eswl.SundayIn2.hour + ":" + this.eswl.SundayIn2.minute,
            SundayOut2: this.eswl.SundayOut2.hour + ":" + this.eswl.SundayOut2.minute,
        }
        this.employeeScheduleWeekService.update(itemj)
            .subscribe(t => {

            });
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
                        this.visibleRange.start = this.employeeScheduleList.StartDate.split('T')[0];
                        this.visibleRange.end = this.employeeScheduleList.EndDate.split('T')[0];
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
                    var weekSchedule = s[0];

                    this.eswl.Id = weekSchedule.Id;
                    this.eswl.EmployeeScheduleId = weekSchedule.EmployeeScheduleId;

                    this.eswl.MondayIn1.hour = parseInt(weekSchedule.MondayIn1.split(":")[0]);
                    this.eswl.MondayIn1.minute = parseInt(weekSchedule.MondayIn1.split(":")[1]);
                    this.eswl.MondayOut1.hour = parseInt(weekSchedule.MondayOut1.split(":")[0]);
                    this.eswl.MondayOut1.minute = parseInt(weekSchedule.MondayOut1.split(":")[1]);
                    this.eswl.MondayIn2.hour = parseInt(weekSchedule.MondayIn2.split(":")[0]);
                    this.eswl.MondayIn2.minute = parseInt(weekSchedule.MondayIn2.split(":")[1]);
                    this.eswl.MondayOut2.hour = parseInt(weekSchedule.MondayOut2.split(":")[0]);
                    this.eswl.MondayOut2.minute = parseInt(weekSchedule.MondayOut2.split(":")[1]);
                    this.calDayHours('Monday');

                    this.eswl.TuesdayIn1.hour = parseInt(weekSchedule.TuesdayIn1.split(":")[0]);
                    this.eswl.TuesdayIn1.minute = parseInt(weekSchedule.TuesdayIn1.split(":")[1]);
                    this.eswl.TuesdayOut1.hour = parseInt(weekSchedule.TuesdayOut1.split(":")[0]);
                    this.eswl.TuesdayOut1.minute = parseInt(weekSchedule.TuesdayOut1.split(":")[1]);
                    this.eswl.TuesdayIn2.hour = parseInt(weekSchedule.TuesdayIn2.split(":")[0]);
                    this.eswl.TuesdayIn2.minute = parseInt(weekSchedule.TuesdayIn2.split(":")[1]);
                    this.eswl.TuesdayOut2.hour = parseInt(weekSchedule.TuesdayOut2.split(":")[0]);
                    this.eswl.TuesdayOut2.minute = parseInt(weekSchedule.TuesdayOut2.split(":")[1]);
                    this.calDayHours('Tuesday');

                    this.eswl.WednesdayIn1.hour = parseInt(weekSchedule.WednesdayIn1.split(":")[0]);
                    this.eswl.WednesdayIn1.minute = parseInt(weekSchedule.WednesdayIn1.split(":")[1]);
                    this.eswl.WednesdayOut1.hour = parseInt(weekSchedule.WednesdayOut1.split(":")[0]);
                    this.eswl.WednesdayOut1.minute = parseInt(weekSchedule.WednesdayOut1.split(":")[1]);
                    this.eswl.WednesdayIn2.hour = parseInt(weekSchedule.WednesdayIn2.split(":")[0]);
                    this.eswl.WednesdayIn2.minute = parseInt(weekSchedule.WednesdayIn2.split(":")[1]);
                    this.eswl.WednesdayOut2.hour = parseInt(weekSchedule.WednesdayOut2.split(":")[0]);
                    this.eswl.WednesdayOut2.minute = parseInt(weekSchedule.WednesdayOut2.split(":")[1]);
                    this.calDayHours('Wednesday');

                    this.eswl.ThursdayIn1.hour = parseInt(weekSchedule.ThursdayIn1.split(":")[0]);
                    this.eswl.ThursdayIn1.minute = parseInt(weekSchedule.ThursdayIn1.split(":")[1]);
                    this.eswl.ThursdayOut1.hour = parseInt(weekSchedule.ThursdayOut1.split(":")[0]);
                    this.eswl.ThursdayOut1.minute = parseInt(weekSchedule.ThursdayOut1.split(":")[1]);
                    this.eswl.ThursdayIn2.hour = parseInt(weekSchedule.ThursdayIn2.split(":")[0]);
                    this.eswl.ThursdayIn2.minute = parseInt(weekSchedule.ThursdayIn2.split(":")[1]);
                    this.eswl.ThursdayOut2.hour = parseInt(weekSchedule.ThursdayOut2.split(":")[0]);
                    this.eswl.ThursdayOut2.minute = parseInt(weekSchedule.ThursdayOut2.split(":")[1]);
                    this.calDayHours('Thursday');

                    this.eswl.FridayIn1.hour = parseInt(weekSchedule.FridayIn1.split(":")[0]);
                    this.eswl.FridayIn1.minute = parseInt(weekSchedule.FridayIn1.split(":")[1]);
                    this.eswl.FridayOut1.hour = parseInt(weekSchedule.FridayOut1.split(":")[0]);
                    this.eswl.FridayOut1.minute = parseInt(weekSchedule.FridayOut1.split(":")[1]);
                    this.eswl.FridayIn2.hour = parseInt(weekSchedule.FridayIn2.split(":")[0]);
                    this.eswl.FridayIn2.minute = parseInt(weekSchedule.FridayIn2.split(":")[1]);
                    this.eswl.FridayOut2.hour = parseInt(weekSchedule.FridayOut2.split(":")[0]);
                    this.eswl.FridayOut2.minute = parseInt(weekSchedule.FridayOut2.split(":")[1]);
                    this.calDayHours('Friday');

                    this.eswl.SaturdayIn1.hour = parseInt(weekSchedule.SaturdayIn1.split(":")[0]);
                    this.eswl.SaturdayIn1.minute = parseInt(weekSchedule.SaturdayIn1.split(":")[1]);
                    this.eswl.SaturdayOut1.hour = parseInt(weekSchedule.SaturdayOut1.split(":")[0]);
                    this.eswl.SaturdayOut1.minute = parseInt(weekSchedule.SaturdayOut1.split(":")[1]);
                    this.eswl.SaturdayIn2.hour = parseInt(weekSchedule.SaturdayIn2.split(":")[0]);
                    this.eswl.SaturdayIn2.minute = parseInt(weekSchedule.SaturdayIn2.split(":")[1]);
                    this.eswl.SaturdayOut2.hour = parseInt(weekSchedule.SaturdayOut2.split(":")[0]);
                    this.eswl.SaturdayOut2.minute = parseInt(weekSchedule.SaturdayOut2.split(":")[1]);
                    this.calDayHours('Saturday');

                    this.eswl.SundayIn1.hour = parseInt(weekSchedule.SundayIn1.split(":")[0]);
                    this.eswl.SundayIn1.minute = parseInt(weekSchedule.SundayIn1.split(":")[1]);
                    this.eswl.SundayOut1.hour = parseInt(weekSchedule.SundayOut1.split(":")[0]);
                    this.eswl.SundayOut1.minute = parseInt(weekSchedule.SundayOut1.split(":")[1]);
                    this.eswl.SundayIn2.hour = parseInt(weekSchedule.SundayIn2.split(":")[0]);
                    this.eswl.SundayIn2.minute = parseInt(weekSchedule.SundayIn2.split(":")[1]);
                    this.eswl.SundayOut2.hour = parseInt(weekSchedule.SundayOut2.split(":")[0]);
                    this.eswl.SundayOut2.minute = parseInt(weekSchedule.SundayOut2.split(":")[1]);
                    this.calDayHours('Sunday');
                    this.calTotalHours();
                    console.log(this.eswl);
                }
                else {
                    this.isScheduleWeekAvailable = true;
                    let itemj: EmployeeScheduleWeek = {
                        Id: 0,
                        EmployeeScheduleId: employeeScheduleId,
                        MondayIn1: "",
                        MondayOut1: "",
                        MondayIn2: "",
                        MondayOut2: "",
                        TuesdayIn1: "",
                        TuesdayOut1: "",
                        TuesdayIn2: "",
                        TuesdayOut2: "",
                        WednesdayIn1: "",
                        WednesdayOut1: "",
                        WednesdayIn2: "",
                        WednesdayOut2: "",
                        ThursdayIn1: "",
                        ThursdayOut1: "",
                        ThursdayIn2: "",
                        ThursdayOut2: "",
                        FridayIn1: "",
                        FridayOut1: "",
                        FridayIn2: "",
                        FridayOut2: "",
                        SaturdayIn1: "",
                        SaturdayOut1: "",
                        SaturdayIn2: "",
                        SaturdayOut2: "",
                        SundayIn1: "",
                        SundayOut1: "",
                        SundayIn2: "",
                        SundayOut2: ""
                    }
                    this.employeeScheduleWeekService.create(itemj)
                        .subscribe(t => {
                            this.eswl = t;

                        });
                }

            });
    }
    
}
