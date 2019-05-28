import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';
import { EmployeeSchedule, EmployeeScheduleService } from '../../services/employees-schedule.service';
import { EmployeeScheduleWeek, EmployeeScheduleWeekService } from '../../services/employees-schedule-week.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

    constructor(private employeeService: EmployeeService, private employeeScheduleService: EmployeeScheduleService, private employeeScheduleWeekService: EmployeeScheduleWeekService) {
      
    }
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
  
    visibleRange = {
        start: '',
        end: ''
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
                t.setValue(f.value);
                return {
                    dates: "StartDate should be less than EndDate"
                };
            }
            return {};
        }
    }

    @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

    calendarVisible = true;
    calendarPlugins = [dayGridPlugin, timeGrigPlugin];
    calendarWeekends = true;
    calendarEvents: EventInput[] = [
        { title: 'Event Now', start: "2019-04-29T02:15:00", end: "2019-04-29T03:15:00" }
    ];

    toggleVisible() {
        this.calendarVisible = !this.calendarVisible;
    }

    toggleWeekends() {
        this.calendarWeekends = !this.calendarWeekends;
    }

    gotoPast() {
        let calendarApi = this.calendarComponent.getApi();
        calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
    }

    handleDateClick(arg) {
        if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
            this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
                title: 'New Event',
                start: arg.date,
                allDay: arg.allDay
            })
        }
    }


    calDayHours(day: string) {
        var M1h = 0, M2h = 0;
        var dayIn1 = day + "In1", dayOut1 = day + "Out1", dayIn2 = day + "In2", dayOut2 = day + "Out2", dayHours = day + "Hours";

        M1h = (((this.eswl[dayOut1].hour * 60) + this.eswl[dayOut1].minute) - ((this.eswl[dayIn1].hour * 60) + this.eswl[dayIn1].minute)) / 60;
        if (M2h == 0) {
            this.eswl[dayHours] = M1h;
        }
        M2h = (((this.eswl[dayOut2].hour * 60) + this.eswl[dayOut2].minute) - ((this.eswl[dayIn2].hour * 60) + this.eswl[dayIn2].minute)) / 60;
        if (M1h == 0) {
            this.eswl[dayHours] = M2h;
        }
        let hours: number = M1h + M2h;
        this.eswl[dayHours] = hours;

       

        //var in1h = "", in1m = "", out1h = "", out1m = "";
        //if (this.eswl[dayIn1].hour <= 9) {
        //    in1h = "0" + this.eswl[dayIn1].hour;
        //}
        //else {
        //    in1h = this.eswl[dayIn1].hour;
        //}
        //if (this.eswl[dayIn1].minute <= 9) {
        //    in1m = "0" + this.eswl[dayIn1].minute;
        //}
        //else {
        //    in1m = this.eswl[dayIn1].minute;
        //}
        //if (this.eswl[dayOut1].hour <= 9) {
        //    out1h = "0" + this.eswl[dayIn1].hour;
        //}
        //else {
        //    out1h = this.eswl[dayIn1].hour;
        //}
        //if (this.eswl[dayOut1].minute <= 9) {
        //    out1m = "0" + this.eswl[dayIn1].minute;
        //}
        //else {
        //    out1m = this.eswl[dayIn1].minute;
        //}

        //this.calendarEvents.push({
        //    title: this.scheduleForm.controls.EmployeeScheduleId,
        //    start: this.scheduleForm.controls.StartDate.value + "T" + in1h + ":" + in1m + ":00",
        //    end: this.scheduleForm.controls.StartDate.value + "T" + out1h + ":" + out1m + ":00"
        //});

        //console.log(this.scheduleForm.controls.StartDate.value + "T" + in1h + ":" + in1m + ":00", this.scheduleForm.controls.StartDate.value + "T" + out1h + ":" + out1m + ":00");

        this.calTotalHours();
    }

    calTotalHours() {
        let totalhours: any = this.eswl.MondayHours + this.eswl.TuesdayHours + this.eswl.WednesdayHours + this.eswl.ThursdayHours + this.eswl.FridayHours +
            this.eswl.SaturdayHours + this.eswl.SundayHours;
        this.eswl.TotalHours = totalhours;
    }

    ngOnInit() {
        this.employeeService.listFiltered("Active=1")
            .subscribe(r => {
                this.employees = r;
            });

    }

    public employees: Employee[];
    public sucessMessage: string = "";

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
                if (t) {
                    this.sucessMessage = "Saved Successfully...";
                    setTimeout(r => {
                        this.sucessMessage = "";
                    }, 5000);
                }
            });
        this.scheduleForm.controls["StartDate"].valueChanges.subscribe(r => {
            console.log(r);
        });
    }
    reset() {
        this.scheduleForm.reset();
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
                        this.scheduleForm.controls.Id.setValue(0);
                        this.scheduleForm.controls.StartDate.setValue("");
                        this.scheduleForm.controls.EndDate.setValue("");
                        var employeeScheduleId = 0;
                        this.visibleRange.start = "";
                        this.visibleRange.end = "";
                    }
                });
        }
        else {
            this.isScheduleAvailable = false;
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
                    this.isScheduleAvailable = true;
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

                    this.eswl.MondayIn1.hour =  +weekSchedule.MondayIn1.split(":")[0];
                    this.eswl.MondayIn1.minute = +weekSchedule.MondayIn1.split(":")[1];
                    this.eswl.MondayOut1.hour = +weekSchedule.MondayOut1.split(":")[0];
                    this.eswl.MondayOut1.minute = +weekSchedule.MondayOut1.split(":")[1];
                    this.eswl.MondayIn2.hour = +weekSchedule.MondayIn2.split(":")[0];
                    this.eswl.MondayIn2.minute = +weekSchedule.MondayIn2.split(":")[1];
                    this.eswl.MondayOut2.hour = +weekSchedule.MondayOut2.split(":")[0];
                    this.eswl.MondayOut2.minute = +weekSchedule.MondayOut2.split(":")[1];

                    this.calDayHours('Monday');

                   

                    this.eswl.TuesdayIn1.hour = +weekSchedule.TuesdayIn1.split(":")[0];
                    this.eswl.TuesdayIn1.minute = +weekSchedule.TuesdayIn1.split(":")[1];
                    this.eswl.TuesdayOut1.hour = +weekSchedule.TuesdayOut1.split(":")[0];
                    this.eswl.TuesdayOut1.minute = +weekSchedule.TuesdayOut1.split(":")[1];
                    this.eswl.TuesdayIn2.hour = +weekSchedule.TuesdayIn2.split(":")[0];
                    this.eswl.TuesdayIn2.minute = +weekSchedule.TuesdayIn2.split(":")[1];
                    this.eswl.TuesdayOut2.hour = +weekSchedule.TuesdayOut2.split(":")[0];
                    this.eswl.TuesdayOut2.minute = +weekSchedule.TuesdayOut2.split(":")[1];
                    this.calDayHours('Tuesday');

                    this.eswl.WednesdayIn1.hour = +weekSchedule.WednesdayIn1.split(":")[0];
                    this.eswl.WednesdayIn1.minute = +weekSchedule.WednesdayIn1.split(":")[1];
                    this.eswl.WednesdayOut1.hour = +weekSchedule.WednesdayOut1.split(":")[0];
                    this.eswl.WednesdayOut1.minute = +weekSchedule.WednesdayOut1.split(":")[1];
                    this.eswl.WednesdayIn2.hour = +weekSchedule.WednesdayIn2.split(":")[0];
                    this.eswl.WednesdayIn2.minute = +weekSchedule.WednesdayIn2.split(":")[1];
                    this.eswl.WednesdayOut2.hour = +weekSchedule.WednesdayOut2.split(":")[0];
                    this.eswl.WednesdayOut2.minute = +weekSchedule.WednesdayOut2.split(":")[1];
                    this.calDayHours('Wednesday');

                    this.eswl.ThursdayIn1.hour = +weekSchedule.ThursdayIn1.split(":")[0];
                    this.eswl.ThursdayIn1.minute = +weekSchedule.ThursdayIn1.split(":")[1];
                    this.eswl.ThursdayOut1.hour = +weekSchedule.ThursdayOut1.split(":")[0];
                    this.eswl.ThursdayOut1.minute = +weekSchedule.ThursdayOut1.split(":")[1];
                    this.eswl.ThursdayIn2.hour = +weekSchedule.ThursdayIn2.split(":")[0];
                    this.eswl.ThursdayIn2.minute = +weekSchedule.ThursdayIn2.split(":")[1];
                    this.eswl.ThursdayOut2.hour = +weekSchedule.ThursdayOut2.split(":")[0];
                    this.eswl.ThursdayOut2.minute = +weekSchedule.ThursdayOut2.split(":")[1];
                    this.calDayHours('Thursday');

                    this.eswl.FridayIn1.hour = +weekSchedule.FridayIn1.split(":")[0];
                    this.eswl.FridayIn1.minute = +weekSchedule.FridayIn1.split(":")[1];
                    this.eswl.FridayOut1.hour = +weekSchedule.FridayOut1.split(":")[0];
                    this.eswl.FridayOut1.minute = +weekSchedule.FridayOut1.split(":")[1];
                    this.eswl.FridayIn2.hour = +weekSchedule.FridayIn2.split(":")[0];
                    this.eswl.FridayIn2.minute = +weekSchedule.FridayIn2.split(":")[1];
                    this.eswl.FridayOut2.hour = +weekSchedule.FridayOut2.split(":")[0];
                    this.eswl.FridayOut2.minute = +weekSchedule.FridayOut2.split(":")[1];
                    this.calDayHours('Friday');

                    this.eswl.SaturdayIn1.hour = +weekSchedule.SaturdayIn1.split(":")[0];
                    this.eswl.SaturdayIn1.minute = +weekSchedule.SaturdayIn1.split(":")[1];
                    this.eswl.SaturdayOut1.hour = +weekSchedule.SaturdayOut1.split(":")[0];
                    this.eswl.SaturdayOut1.minute = +weekSchedule.SaturdayOut1.split(":")[1];
                    this.eswl.SaturdayIn2.hour = +weekSchedule.SaturdayIn2.split(":")[0];
                    this.eswl.SaturdayIn2.minute = +weekSchedule.SaturdayIn2.split(":")[1];
                    this.eswl.SaturdayOut2.hour = +weekSchedule.SaturdayOut2.split(":")[0];
                    this.eswl.SaturdayOut2.minute = +weekSchedule.SaturdayOut2.split(":")[1];
                    this.calDayHours('Saturday');

                    this.eswl.SundayIn1.hour = +weekSchedule.SundayIn1.split(":")[0];
                    this.eswl.SundayIn1.minute = +weekSchedule.SundayIn1.split(":")[1];
                    this.eswl.SundayOut1.hour = +weekSchedule.SundayOut1.split(":")[0];
                    this.eswl.SundayOut1.minute = +weekSchedule.SundayOut1.split(":")[1];
                    this.eswl.SundayIn2.hour = +weekSchedule.SundayIn2.split(":")[0];
                    this.eswl.SundayIn2.minute = +weekSchedule.SundayIn2.split(":")[1];
                    this.eswl.SundayOut2.hour = +weekSchedule.SundayOut2.split(":")[0];
                    this.eswl.SundayOut2.minute = +weekSchedule.SundayOut2.split(":")[1];
                    this.calDayHours('Sunday');

                    this.calTotalHours();
                }
                else {
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
                            this.isScheduleWeekAvailable = true;
                            var weekSchedule = t;

                            this.eswl.Id = weekSchedule.Id;
                            this.eswl.EmployeeScheduleId = weekSchedule.EmployeeScheduleId;

                            this.eswl.MondayIn1.hour = +weekSchedule.MondayIn1.split(":")[0];
                            this.eswl.MondayIn1.minute = +weekSchedule.MondayIn1.split(":")[1];
                            this.eswl.MondayOut1.hour = +weekSchedule.MondayOut1.split(":")[0];
                            this.eswl.MondayOut1.minute = +weekSchedule.MondayOut1.split(":")[1];
                            this.eswl.MondayIn2.hour = +weekSchedule.MondayIn2.split(":")[0];
                            this.eswl.MondayIn2.minute = +weekSchedule.MondayIn2.split(":")[1];
                            this.eswl.MondayOut2.hour = +weekSchedule.MondayOut2.split(":")[0];
                            this.eswl.MondayOut2.minute = +weekSchedule.MondayOut2.split(":")[1];

                            this.calDayHours('Monday');

                           


                            this.eswl.TuesdayIn1.hour = +weekSchedule.TuesdayIn1.split(":")[0];
                            this.eswl.TuesdayIn1.minute = +weekSchedule.TuesdayIn1.split(":")[1];
                            this.eswl.TuesdayOut1.hour = +weekSchedule.TuesdayOut1.split(":")[0];
                            this.eswl.TuesdayOut1.minute = +weekSchedule.TuesdayOut1.split(":")[1];
                            this.eswl.TuesdayIn2.hour = +weekSchedule.TuesdayIn2.split(":")[0];
                            this.eswl.TuesdayIn2.minute = +weekSchedule.TuesdayIn2.split(":")[1];
                            this.eswl.TuesdayOut2.hour = +weekSchedule.TuesdayOut2.split(":")[0];
                            this.eswl.TuesdayOut2.minute = +weekSchedule.TuesdayOut2.split(":")[1];
                            this.calDayHours('Tuesday');

                            this.eswl.WednesdayIn1.hour = +weekSchedule.WednesdayIn1.split(":")[0];
                            this.eswl.WednesdayIn1.minute = +weekSchedule.WednesdayIn1.split(":")[1];
                            this.eswl.WednesdayOut1.hour = +weekSchedule.WednesdayOut1.split(":")[0];
                            this.eswl.WednesdayOut1.minute = +weekSchedule.WednesdayOut1.split(":")[1];
                            this.eswl.WednesdayIn2.hour = +weekSchedule.WednesdayIn2.split(":")[0];
                            this.eswl.WednesdayIn2.minute = +weekSchedule.WednesdayIn2.split(":")[1];
                            this.eswl.WednesdayOut2.hour = +weekSchedule.WednesdayOut2.split(":")[0];
                            this.eswl.WednesdayOut2.minute = +weekSchedule.WednesdayOut2.split(":")[1];
                            this.calDayHours('Wednesday');

                            this.eswl.ThursdayIn1.hour = +weekSchedule.ThursdayIn1.split(":")[0];
                            this.eswl.ThursdayIn1.minute = +weekSchedule.ThursdayIn1.split(":")[1];
                            this.eswl.ThursdayOut1.hour = +weekSchedule.ThursdayOut1.split(":")[0];
                            this.eswl.ThursdayOut1.minute = +weekSchedule.ThursdayOut1.split(":")[1];
                            this.eswl.ThursdayIn2.hour = +weekSchedule.ThursdayIn2.split(":")[0];
                            this.eswl.ThursdayIn2.minute = +weekSchedule.ThursdayIn2.split(":")[1];
                            this.eswl.ThursdayOut2.hour = +weekSchedule.ThursdayOut2.split(":")[0];
                            this.eswl.ThursdayOut2.minute = +weekSchedule.ThursdayOut2.split(":")[1];
                            this.calDayHours('Thursday');

                            this.eswl.FridayIn1.hour = +weekSchedule.FridayIn1.split(":")[0];
                            this.eswl.FridayIn1.minute = +weekSchedule.FridayIn1.split(":")[1];
                            this.eswl.FridayOut1.hour = +weekSchedule.FridayOut1.split(":")[0];
                            this.eswl.FridayOut1.minute = +weekSchedule.FridayOut1.split(":")[1];
                            this.eswl.FridayIn2.hour = +weekSchedule.FridayIn2.split(":")[0];
                            this.eswl.FridayIn2.minute = +weekSchedule.FridayIn2.split(":")[1];
                            this.eswl.FridayOut2.hour = +weekSchedule.FridayOut2.split(":")[0];
                            this.eswl.FridayOut2.minute = +weekSchedule.FridayOut2.split(":")[1];
                            this.calDayHours('Friday');

                            this.eswl.SaturdayIn1.hour = +weekSchedule.SaturdayIn1.split(":")[0];
                            this.eswl.SaturdayIn1.minute = +weekSchedule.SaturdayIn1.split(":")[1];
                            this.eswl.SaturdayOut1.hour = +weekSchedule.SaturdayOut1.split(":")[0];
                            this.eswl.SaturdayOut1.minute = +weekSchedule.SaturdayOut1.split(":")[1];
                            this.eswl.SaturdayIn2.hour = +weekSchedule.SaturdayIn2.split(":")[0];
                            this.eswl.SaturdayIn2.minute = +weekSchedule.SaturdayIn2.split(":")[1];
                            this.eswl.SaturdayOut2.hour = +weekSchedule.SaturdayOut2.split(":")[0];
                            this.eswl.SaturdayOut2.minute = +weekSchedule.SaturdayOut2.split(":")[1];
                            this.calDayHours('Saturday');

                            this.eswl.SundayIn1.hour = +weekSchedule.SundayIn1.split(":")[0];
                            this.eswl.SundayIn1.minute = +weekSchedule.SundayIn1.split(":")[1];
                            this.eswl.SundayOut1.hour = +weekSchedule.SundayOut1.split(":")[0];
                            this.eswl.SundayOut1.minute = +weekSchedule.SundayOut1.split(":")[1];
                            this.eswl.SundayIn2.hour = +weekSchedule.SundayIn2.split(":")[0];
                            this.eswl.SundayIn2.minute = +weekSchedule.SundayIn2.split(":")[1];
                            this.eswl.SundayOut2.hour = +weekSchedule.SundayOut2.split(":")[0];
                            this.eswl.SundayOut2.minute = +weekSchedule.SundayOut2.split(":")[1];
                            this.calDayHours('Sunday');

                            this.calTotalHours();
                        });
                }

            });
    }

}
