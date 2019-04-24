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
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'passwordrecovery', component: PasswordrecoveryComponent },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'Employee', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'Location', component: LocationComponent, canActivate: [AuthGuard] },
  { path: 'Room', component: RoomComponent, canActivate: [AuthGuard] },
  { path: 'MaintenanceService', component: WorkorderComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'signin' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
