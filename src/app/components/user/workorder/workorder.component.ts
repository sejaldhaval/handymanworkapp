import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { MaintenanceService, MaintenanceserviceService } from '../../../services/maintenanceservice.service';
import { Location, LocationService } from '../../../services/location.service';
import { Employee, EmployeeService } from '../../../services/employee.service';
import { MaintenanceIssueStatus, MaintenanceissuestatusService } from '../../../services/maintenanceissuestatus.service';
import { MaintenancePriority, MaintenancepriorityService } from '../../../services/maintenancepriority.service';
import { Room, RoomService } from '../../../services/room.service';
import { MaintenanceServiceImages, MaintenanceserviceimagesService } from '../../../services/maintenanceserviceimages.service';
import { MaintenanceServiceStatus, MaintenanceservicestatusService } from '../../../services/maintenanceservicestatus.service';
declare var $: any;

@Component({
    selector: 'app-workorder',
    templateUrl: './workorder.component.html',
    styleUrls: ['./workorder.component.css']
})
export class WorkorderComponent implements OnInit {

    constructor(private maintenanceserviceService: MaintenanceserviceService, private locationService: LocationService, private employeeService: EmployeeService,
        private maintenanceissuestatusService: MaintenanceissuestatusService, private maintenancepriorityService: MaintenancepriorityService, private roomService: RoomService,
        private maintenanceserviceimagesService: MaintenanceserviceimagesService, private maintenanceservicestatusService: MaintenanceservicestatusService) { }

    public maintenanceRequestList: any;
    public locationList: Location[];
    public employeeList: Employee[];
    public maintenanceIssueStatusList: MaintenanceIssueStatus[];
    public maintenancePriorityList: MaintenancePriority[];
    public roomList: Room[];
    public updateList:any;
    public modalTitle: string = "";
    public filterProperty: string = "";
    public sortArray: any;
    public sortProperty: any;
    public filterString: string = "";
    public action: string = "List";
    public filesToUpload: File[];
    public serviceImage: MaintenanceServiceImages = {
        errorMessage: "",
        errorStatus: false,
        Id: 0,
        Image: "",
        MaintenanceServiceId: 0
    };
    public maintenanceCommentForm: FormGroup = new FormGroup({
        Id: new FormControl(0),
        MaintenanceServiceId: new FormControl(0, Validators.required),
        Comment: new FormControl("", Validators.required)
    });

    public maintenanceRequestForm: FormGroup = new FormGroup({
        Id: new FormControl(0),
        LocationId: new FormControl(0, Validators.required),
        LocationName: new FormControl("", Validators.required),
        AssignedEmployeeId: new FormControl(0, Validators.required),
        AssignedEmployeeName: new FormControl("", Validators.required),
        Deleted: new FormControl(false),
        MaintenanceIssueStatusId: new FormControl(0, Validators.required),
        MaintenanceIssueStatusName: new FormControl('', Validators.required),
        MaintenancePriorityId: new FormControl(0, Validators.required),
        MaintenancePriorityName: new FormControl('', Validators.required),
        DaysToFinish: new FormControl(0),
        RoomId: new FormControl(0, Validators.required),
        RoomName: new FormControl('', Validators.required),
        Comment: new FormControl(''),
        Description: new FormControl('', Validators.required)
    });

    ngOnInit() {
        this.maintenanceserviceService.listFiltered("Deleted=0 AND MaintenanceIssueStatusId IN (1,3) ORDER BY MaintenanceIssueStatusId,CreatedOnUtc DESC")
            .subscribe(r => {
                this.maintenanceRequestList = r;
            });
        this.locationService.listAll()
            .subscribe(r => {
                this.locationList = r;
            });
        this.employeeService.listAll()
            .subscribe(r => {
                this.employeeList = r;
            });
        this.maintenanceissuestatusService.listAll()
            .subscribe(r => {
                this.maintenanceIssueStatusList = r;
            });
        this.maintenancepriorityService.listAll()
            .subscribe(r => {
                this.maintenancePriorityList = r;
            });
        this.roomService.listAll()
            .subscribe(r => {
                this.roomList = r;
            });
    }

    oncreate() {
        this.action = "Add";
        this.maintenanceRequestForm.reset();
        this.maintenanceRequestForm.controls["RoomId"].setValue(0);
        this.maintenanceRequestForm.controls["RoomName"].setValue("");
        this.maintenanceRequestForm.controls["AssignedEmployeeId"].setValue(1);
        this.maintenanceRequestForm.controls["AssignedEmployeeName"].setValue("Luke");
        this.maintenanceRequestForm.controls["MaintenanceIssueStatusId"].setValue(1);
        this.maintenanceRequestForm.controls["MaintenanceIssueStatusName"].setValue("Pending");
        this.maintenanceRequestForm.controls["MaintenancePriorityId"].setValue(2);
        this.maintenanceRequestForm.controls["MaintenancePriorityName"].setValue("Medium");
        this.serviceImage = {
            errorMessage: "",
            errorStatus: false,
            Id: 0,
            Image: "",
            MaintenanceServiceId:0
        }
        $("#add").show(500);
        $("#list").hide(500);
    }
    onupdate(item: MaintenanceService) {
        this.action = "Edit";
        this.maintenanceRequestForm.reset();
        $("#add").show(500);
        $("#list").hide(500);
        this.maintenanceRequestForm.controls["Id"].setValue(item.Id);
        this.maintenanceRequestForm.controls["LocationId"].setValue(item.LocationId);
        this.maintenanceRequestForm.controls["LocationName"].setValue(item.LocationName);
        this.maintenanceRequestForm.controls["AssignedEmployeeId"].setValue(item.AssignedEmployeeId);
        this.maintenanceRequestForm.controls["AssignedEmployeeName"].setValue(item.AssignedEmployeeName);
        this.maintenanceRequestForm.controls["Deleted"].setValue(item.Deleted);
        this.maintenanceRequestForm.controls["MaintenanceIssueStatusId"].setValue(item.MaintenanceIssueStatusId);
        this.maintenanceRequestForm.controls["MaintenanceIssueStatusName"].setValue(item.MaintenanceIssueStatusName);
        this.maintenanceRequestForm.controls["MaintenancePriorityId"].setValue(item.MaintenancePriorityId);
        this.maintenanceRequestForm.controls["MaintenancePriorityName"].setValue(item.MaintenancePriorityName);
        this.maintenanceRequestForm.controls["DaysToFinish"].setValue(item.DaysToFinish);
        this.maintenanceRequestForm.controls["RoomId"].setValue(item.RoomId);
        this.maintenanceRequestForm.controls["RoomName"].setValue(item.RoomName);
        this.maintenanceRequestForm.controls["Comment"].setValue(item.Comment);
        this.maintenanceRequestForm.controls["Description"].setValue(item.Description);

        this.maintenanceCommentForm.controls["MaintenanceServiceId"].setValue(item.Id);

        this.maintenanceserviceimagesService.listFiltered("MaintenanceServiceId=" + item.Id)
            .subscribe(r => {
                if (r[0]) {
                    this.serviceImage = r[0];
                }
            });
        this.maintenanceservicestatusService.listFiltered("MaintenanceServiceId=" + item.Id)
            .subscribe(r => {
                    this.updateList = r;
            });
    }
    oncompleted() {
        let item: MaintenanceService = {
            Id: this.maintenanceRequestForm.controls["Id"].value,
            LocationId: this.maintenanceRequestForm.controls["LocationId"].value,
            LocationName: this.maintenanceRequestForm.controls["LocationName"].value,
            AssignedEmployeeId: this.maintenanceRequestForm.controls["AssignedEmployeeId"].value,
            AssignedEmployeeName: this.maintenanceRequestForm.controls["AssignedEmployeeName"].value,
            Deleted: false,
            MaintenanceIssueStatusId: 2,
            MaintenanceIssueStatusName: "Completed",
            MaintenancePriorityId: this.maintenanceRequestForm.controls["MaintenancePriorityId"].value,
            MaintenancePriorityName: this.maintenanceRequestForm.controls["MaintenancePriorityName"].value,
            DaysToFinish: 5,
            RoomId: this.maintenanceRequestForm.controls["RoomId"].value,
            RoomName: this.maintenanceRequestForm.controls["RoomName"].value,
            Comment: this.maintenanceRequestForm.controls["Comment"].value,
            Description: this.maintenanceRequestForm.controls["Description"].value,
            CreatedOnUtc: "",
            UpdatedOnUtc: "",
            errorMessage: "",
            errorStatus: false,
        };
        this.maintenanceserviceService.update(item)
            .subscribe(r => {
                this.maintenanceRequestList.forEach((i, index) => {
                    if (i.Id == item.Id) {
                        this.maintenanceRequestList.splice(index, 1);
                    }
                });
            });
    }
    ondelete(item: MaintenanceService) {
        this.maintenanceRequestForm.controls["Id"].setValue(item.Id);
        $("#deleteRequestModal").modal("show");
    }
    onlist() {
        this.action = "List";
        $("#add").hide(500);
        $("#list").show(500);
    }
    statusChange(status: MaintenanceIssueStatus) {
        this.maintenanceRequestForm.controls["MaintenanceIssueStatusId"].setValue(status.Id);
        this.maintenanceRequestForm.controls["MaintenanceIssueStatusName"].setValue(status.Name);
    }
    locationChange(location: Location) {
        this.maintenanceRequestForm.controls["LocationId"].setValue(location.Id);
        this.maintenanceRequestForm.controls["LocationName"].setValue(location.Name);
    }
    priorityChange(priority: MaintenancePriority) {
        this.maintenanceRequestForm.controls["MaintenancePriorityId"].setValue(priority.Id);
        this.maintenanceRequestForm.controls["MaintenancePriorityName"].setValue(priority.Name);
    }
    updateRoomSelect(array, Id, control) {
        var item = array.filter(h => h.Id == Id)[0];
        if (item != undefined) {
            control.setValue(item["Name"]);
        }
    }
    updateEmployeeSelect(array, Id, control) {
        var item = array.filter(h => h.Id == Id)[0];
        if (item != undefined) {
            control.setValue(item["FirstName"]);
        }
    }
    handleFileInput(files: any) {
        if (files.length === 0)
            return;

        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.serviceImage.Image = reader.result;
        }
    }
    showImage() {
        $("#imageModal").modal("show");
    }
    create() {
        if (this.maintenanceRequestForm.valid) {
            let item: MaintenanceService = {
                Id: 1,
                LocationId: this.maintenanceRequestForm.controls["LocationId"].value,
                LocationName: this.maintenanceRequestForm.controls["LocationName"].value,
                AssignedEmployeeId: this.maintenanceRequestForm.controls["AssignedEmployeeId"].value,
                AssignedEmployeeName: this.maintenanceRequestForm.controls["AssignedEmployeeName"].value,
                Deleted: false,
                MaintenanceIssueStatusId: this.maintenanceRequestForm.controls["MaintenanceIssueStatusId"].value,
                MaintenanceIssueStatusName: this.maintenanceRequestForm.controls["MaintenanceIssueStatusName"].value,
                MaintenancePriorityId: this.maintenanceRequestForm.controls["MaintenancePriorityId"].value,
                MaintenancePriorityName: this.maintenanceRequestForm.controls["MaintenancePriorityName"].value,
                DaysToFinish: 5,
                RoomId: this.maintenanceRequestForm.controls["RoomId"].value,
                RoomName: this.maintenanceRequestForm.controls["RoomName"].value,
                Comment: this.maintenanceRequestForm.controls["Comment"].value,
                Description: this.maintenanceRequestForm.controls["Description"].value,
                CreatedOnUtc: "",
                UpdatedOnUtc: "",
                errorMessage: "",
                errorStatus: false,
            };
            this.maintenanceserviceService.create(item)
                .subscribe(r => {
                    if (this.serviceImage.Image) {
                        let imgitem: MaintenanceServiceImages = {
                            Id: 0,
                            MaintenanceServiceId: r.Id,
                            Image: this.serviceImage.Image,
                            errorMessage: "",
                            errorStatus: false
                        }
                        this.maintenanceserviceimagesService.create(imgitem)
                            .subscribe(ir => {

                            });
                    }
                    this.maintenanceRequestList.splice(0, 0, r);
                    this.onlist();
                });
        }
        else {
            this.maintenanceRequestForm.controls["LocationId"].markAsDirty();
            this.maintenanceRequestForm.controls["AssignedEmployeeId"].markAsDirty();
            this.maintenanceRequestForm.controls["MaintenanceIssueStatusId"].markAsDirty();
            this.maintenanceRequestForm.controls["MaintenancePriorityId"].markAsDirty();
            this.maintenanceRequestForm.controls["RoomId"].markAsDirty();
            this.maintenanceRequestForm.controls["Description"].markAsDirty();
        }
    }
    update() {
        if (this.maintenanceRequestForm.valid) {
            let item: MaintenanceService = {
                Id: this.maintenanceRequestForm.controls["Id"].value,
                LocationId: this.maintenanceRequestForm.controls["LocationId"].value,
                LocationName: this.maintenanceRequestForm.controls["LocationName"].value,
                AssignedEmployeeId: this.maintenanceRequestForm.controls["AssignedEmployeeId"].value,
                AssignedEmployeeName: this.maintenanceRequestForm.controls["AssignedEmployeeName"].value,
                Deleted: false,
                MaintenanceIssueStatusId: this.maintenanceRequestForm.controls["MaintenanceIssueStatusId"].value,
                MaintenanceIssueStatusName: this.maintenanceRequestForm.controls["MaintenanceIssueStatusName"].value,
                MaintenancePriorityId: this.maintenanceRequestForm.controls["MaintenancePriorityId"].value,
                MaintenancePriorityName: this.maintenanceRequestForm.controls["MaintenancePriorityName"].value,
                DaysToFinish: 5,
                RoomId: this.maintenanceRequestForm.controls["RoomId"].value,
                RoomName: this.maintenanceRequestForm.controls["RoomName"].value,
                Comment: this.maintenanceRequestForm.controls["Comment"].value,
                Description: this.maintenanceRequestForm.controls["Description"].value,
                CreatedOnUtc: "",
                UpdatedOnUtc: "",
                errorMessage: "",
                errorStatus: false,
            };
            this.maintenanceserviceService.update(item)
                .subscribe(r => {
                    if (this.serviceImage.Id == 0) {
                        this.serviceImage.MaintenanceServiceId = item.Id;
                        this.maintenanceserviceimagesService.create(this.serviceImage)
                            .subscribe(ir => {

                            });
                    }
                    else {
                        if (this.serviceImage.Image) {
                            this.maintenanceserviceimagesService.update(this.serviceImage)
                                .subscribe(ir => {

                                });
                        }
                    }
                    this.maintenanceRequestList.forEach((i, index) => {
                        if (i.Id == item.Id) {
                            this.maintenanceRequestList.splice(index, 1);
                        }
                    });
                    this.onlist();
                });
        }
        else{
            this.maintenanceRequestForm.controls["LocationId"].markAsDirty();
            this.maintenanceRequestForm.controls["AssignedEmployeeId"].markAsDirty();
            this.maintenanceRequestForm.controls["MaintenanceIssueStatusId"].markAsDirty();
            this.maintenanceRequestForm.controls["MaintenancePriorityId"].markAsDirty();
            this.maintenanceRequestForm.controls["RoomId"].markAsDirty();
            this.maintenanceRequestForm.controls["Description"].markAsDirty();
        }
    }
    delete() {
        let item: MaintenanceService = {
            Id: this.maintenanceRequestForm.controls["Id"].value,
            LocationId: this.maintenanceRequestForm.controls["LocationId"].value,
            LocationName: this.maintenanceRequestForm.controls["LocationName"].value,
            AssignedEmployeeId: this.maintenanceRequestForm.controls["AssignedEmployeeId"].value,
            AssignedEmployeeName: this.maintenanceRequestForm.controls["AssignedEmployeeName"].value,
            Deleted: true,
            MaintenanceIssueStatusId: this.maintenanceRequestForm.controls["MaintenanceIssueStatusId"].value,
            MaintenanceIssueStatusName: this.maintenanceRequestForm.controls["MaintenanceIssueStatusName"].value,
            MaintenancePriorityId: this.maintenanceRequestForm.controls["MaintenancePriorityId"].value,
            MaintenancePriorityName: this.maintenanceRequestForm.controls["MaintenancePriorityName"].value,
            DaysToFinish: 5,
            RoomId: this.maintenanceRequestForm.controls["RoomId"].value,
            RoomName: this.maintenanceRequestForm.controls["RoomName"].value,
            Comment: this.maintenanceRequestForm.controls["Comment"].value,
            Description: this.maintenanceRequestForm.controls["Description"].value,
            CreatedOnUtc: "",
            UpdatedOnUtc: "",
            errorMessage: "",
            errorStatus: false,
        };
        this.maintenanceserviceService.update(item)
            .subscribe(r => {
                this.maintenanceRequestList.forEach((i, index) => {
                    if (i.Id == item.Id) {
                        this.maintenanceRequestList.splice(index, 1);
                    }
                });
            });
        $("#deleteRequestModal").modal("hide");
    }
    createComment() {
        if (this.maintenanceCommentForm.valid) {
            let item: MaintenanceServiceStatus = {
                Id: 0,
                MaintenanceServiceId: this.maintenanceCommentForm.controls["MaintenanceServiceId"].value,
                Comment: this.maintenanceCommentForm.controls["Comment"].value,
                errorMessage: "",
                errorStatus: false,
                CreatedById: 1,
                CreatedByName: "",
                CreatedOnUtc: "",
                UpdatedOnUtc:""
            };
            this.maintenanceservicestatusService.create(item)
                .subscribe(r => {
                    console.log(r);
                    this.updateList.splice(this.updateList.length, 0, r);
                    this.maintenanceCommentForm.controls["Comment"].setValue("");
                });
        }
        else {
            this.maintenanceCommentForm.controls["Comment"].markAsDirty();
        }
    }
    filter(property: string) {
        this.filterProperty = "filterBy" + property;
        $("#workOrderModal").modal("show");
        $("#sortmodal").hide();
        $("#filtermodal").show();

    }
    doFilter(filterName: any, item: any) {
        if (filterName == "" && item == null) {
            this.filterString = "";
            this.maintenanceserviceService.listFiltered("Deleted=0 AND MaintenanceIssueStatusId IN (1,3) ORDER BY MaintenanceIssueStatusId,CreatedOnUtc DESC")
                .subscribe(r => {
                    this.maintenanceRequestList = r;
                });
        }
        else {
            if (filterName == "AssignedEmployeeId") {
                this.filterString = filterName.slice(0, -2) + "=" + item.NickName;
            }
            else {
                this.filterString = filterName.slice(0, -2) + "=" + item.Name;
            }
            this.maintenanceserviceService.listFiltered("Deleted=0 AND " + filterName + " = " + item.Id)
                .subscribe(r => {
                    this.maintenanceRequestList = r;
                });
        }
        
        $("#workOrderModal").modal("hide");
    }
    sort() {
        $("#workOrderModal").modal("show");
        $("#sortmodal").show();
        $("#filtermodal").hide();
    }
    public sortorder: boolean = false;
    doSort(property: any) {
        this.sortProperty = property.slice(0, -2);
        this.sortorder == true ? this.sortorder = false : this.sortorder = true;
        if (this.sortorder) {
            this.maintenanceRequestList.sort((a, b) => a[property] !== b[property] ? a[property] < b[property] ? -1 : 1 : 0);
        }
        else {
            this.maintenanceRequestList.sort((a, b) => b[property] !== a[property] ? b[property] < a[property] ? -1 : 1 : 0);
        }
        $("#workOrderModal").modal("hide");
    }
}
