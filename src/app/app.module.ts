import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared-components/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material';
import { DemoMaterialModule } from './material-module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PasswordrecoveryComponent } from './components/passwordrecovery/passwordrecovery.component';
import { WorkorderComponent } from './components/user/workorder/workorder.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

import { HttpErrorHandlerService } from './http-error-handler.service';
import { EmployeeService } from './services/employee.service';
import { InventoryitemService } from './services/inventoryitem.service';
import { InventorytypeService } from './services/inventorytype.service';
import { LocationService } from './services/location.service';
import { MaintenanceissuestatusService } from './services/maintenanceissuestatus.service';
import { MaintenancepriorityService } from './services/maintenancepriority.service';
import { MaintenanceserviceService } from './services/maintenanceservice.service';
import { MaintenanceserviceimagesService } from './services/maintenanceserviceimages.service';
import { MenuoptionsService } from './services/menuoptions.service';
import { PurchaseorderService } from './services/purchaseorder.service';
import { PurchaseorderstatusService } from './services/purchaseorderstatus.service';
import { RoomService } from './services/room.service';
import { UserrolesService } from './services/userroles.service';
import { UserrolesmenuoptionsmappingService } from './services/userrolesmenuoptionsmapping.service';
import { VendorService } from './services/vendor.service';
import { MaintenanceservicestatusService } from './services/maintenanceservicestatus.service';
import { EmployeeScheduleService } from './services/employees-schedule.service';
import { EmployeeScheduleWeekService } from './services/employees-schedule-week.service';

import { AuthService } from './auth.service';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthInterceptor } from 'src/app/auth.interceptor';

import { EmployeeComponent } from './components/employee/employee.component';
import { LocationComponent } from './components/location/location.component';
import { RoomComponent } from './components/room/room.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryItemComponent } from './components/inventory-item/inventory-item.component';
import { InventoryTypeComponent } from './components/inventory-type/inventory-type.component';
import { MaintenanceIssueStatusComponent } from './components/maintenance-issue-status/maintenance-issue-status.component';
import { MaintenancePriorityComponent } from './components/maintenance-priority/maintenance-priority.component';
import { MaintenanceServiceImagesComponent } from './components/maintenance-service-images/maintenance-service-images.component';
import { MaintenanceServiceStatusComponent } from './components/maintenance-service-status/maintenance-service-status.component';
import { MenuOptionsComponent } from './components/menu-options/menu-options.component';
import { PurchaseOrderStatusComponent } from './components/purchase-order-status/purchase-order-status.component';
import { UserRolesComponent } from './components/user-roles/user-roles.component';
import { UserRolesMenuOptionsMappingComponent } from './components/user-roles-menu-options-mapping/user-roles-menu-options-mapping.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        UserComponent,
        SigninComponent,
        SignupComponent,
        PasswordrecoveryComponent,
        WorkorderComponent,
        DashboardComponent,
        EmployeeComponent,
        LocationComponent,
        RoomComponent,
        HomeComponent,
        InventoryItemComponent,
        InventoryTypeComponent,
        MaintenanceIssueStatusComponent,
        MaintenancePriorityComponent,
        MaintenanceServiceImagesComponent,
        MaintenanceServiceStatusComponent,
        MenuOptionsComponent,
        PurchaseOrderStatusComponent,
        UserRolesComponent,
        UserRolesMenuOptionsMappingComponent,
        VendorComponent,
        ScheduleComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        DemoMaterialModule,
        NgbModule.forRoot(),
    ],
    providers: [
        HttpErrorHandlerService,
        EmployeeService,
        InventoryitemService,
        InventorytypeService,
        LocationService,
        MaintenanceissuestatusService,
        MaintenancepriorityService,
        MaintenanceserviceService,
        MaintenanceserviceimagesService,
        MenuoptionsService,
        PurchaseorderService,
        PurchaseorderstatusService,
        RoomService,
        UserrolesService,
        UserrolesmenuoptionsmappingService,
        VendorService,
        MaintenanceservicestatusService,
        AuthService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        EmployeeScheduleService,
        EmployeeScheduleWeekService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
