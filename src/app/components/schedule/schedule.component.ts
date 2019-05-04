import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
this.employeeService.listFiltered("Active=1")
.subscribe(r => {
  this.employees = r;
});
  }

  public employees: Employee[];
  public week1 = [
    { day:"Monday", in1: "", out1:"", in2: "", out2:"",  total:"" },
    { day:"TuesDay", in1: "", out1:"", in2: "", out2:"",  total:"" },
    { day:"Wednesday", in1: "", out1:"", in2: "", out2:"",  total:"" },
    { day:"Thursday", in1: "", out1:"", in2: "", out2:"",  total:"" },
    { day:"Friday", in1: "", out1:"", in2: "", out2:"",  total:"" },
    { day:"Saturday", in1: "", out1:"", in2: "", out2:"",  total:"" },
    { day:"Sunday", in1: "", out1:"", in2: "", out2:"",  total:"" }
  ];
  public week2 = [
    { day:"Monday", in1: "", out1:"", in2: "", out2:"",  total:"" },
    { day:"TuesDay", in1: "", out1:"", in2: "", out2:"",  total:"" },
    { day:"Wednesday", in1: "", out1:"", in2: "", out2:"",  total:"" },
    { day:"Thursday", in1: "", out1:"", in2: "", out2:"",  total:"" },
    { day:"Friday", in1: "", out1:"", in2: "", out2:"",  total:"" },
    { day:"Saturday", in1: "", out1:"", in2: "", out2:"",  total:"" },
    { day:"Sunday", in1: "", out1:"", in2: "", out2:"",  total:"" }
  ];

  onKey(i){
    console.log(i);
  }

  save(){

  }
reset(){

}
}
