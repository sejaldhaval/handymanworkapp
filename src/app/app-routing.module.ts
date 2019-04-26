import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PasswordrecoveryComponent } from './components/passwordrecovery/passwordrecovery.component';
import { WorkorderComponent } from './components/user/workorder/workorder.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
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


import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'Home', component: HomeComponent },
    { path: 'passwordrecovery', component: PasswordrecoveryComponent },
    { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'Employee', component: EmployeeComponent, canActivate: [AuthGuard] },
    { path: 'Location', component: LocationComponent, canActivate: [AuthGuard] },
    { path: 'Room', component: RoomComponent, canActivate: [AuthGuard] },
    { path: 'MaintenanceService', component: WorkorderComponent, canActivate: [AuthGuard] },
    { path: 'User', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'InventoryItem', component: InventoryItemComponent, canActivate: [AuthGuard] },
    { path: 'InventoryType', component: InventoryTypeComponent, canActivate: [AuthGuard] },
    { path: 'MaintenanceIssueStatus', component: MaintenanceIssueStatusComponent, canActivate: [AuthGuard] },
    { path: 'MaintenancePriority', component: MaintenancePriorityComponent, canActivate: [AuthGuard] },
    { path: 'MaintenanceServiceImages', component: MaintenanceServiceImagesComponent, canActivate: [AuthGuard] },
    { path: 'MaintenanceServiceStatus', component: MaintenanceServiceStatusComponent, canActivate: [AuthGuard] },
    { path: 'MenuOptions', component: MenuOptionsComponent, canActivate: [AuthGuard] },
    { path: 'PurchaseOrderStatus', component: PurchaseOrderStatusComponent, canActivate: [AuthGuard] },
    { path: 'UserRoles', component: UserRolesComponent, canActivate: [AuthGuard] },
    { path: 'UserRolesMenuOptionsMapping', component: UserRolesMenuOptionsMappingComponent, canActivate: [AuthGuard] },
    { path: 'Vendor', component: VendorComponent, canActivate: [AuthGuard] }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
