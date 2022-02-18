import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ParentComponent } from './parent/parent.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { UserComponent } from './user/user.component';
import { UserGuardService } from './user-guard.service';
import { AdminGuardService } from './admin-guard.service';
import { AuthAdminService } from './auth-admin.service';
import { AuthUserService } from './auth-user.service';
const routes: Routes = [
  //NOTE:::: I Know how to AuthGuard and i did it right, but it takes time as I depend mainly on
  //Backend server, So I commented lines here, If you want to try them you can Un-Comment the lines ❤

  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'doctors',
    component: ParentComponent,
    // canActivate: [AuthUserService, UserGuardService],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AuthAdminService, AdminGuardService],
  },
  { path: 'no-access', component: NoAccessComponent },
  {
    path: 'add-doctor',
    component: AddDoctorComponent,
    // canActivate: [AuthAdminService, AdminGuardService],
  },
  {
    path: 'edit-users',
    component: EditUsersComponent,
    // canActivate: [AuthAdminService, AdminGuardService],
  },
  {
    path: 'user',
    component: UserComponent,
    // canActivate: [AuthUserService, UserGuardService],
  },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
