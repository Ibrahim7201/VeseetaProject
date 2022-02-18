import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChildComponent } from './child/child.component';
import { FormsModule } from '@angular/forms';
import { ParentComponent } from './parent/parent.component';
import { NavbarComponent } from './navbar/navbar.component';
import { faCoffee, faSync } from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { BtnLoadingComponent } from './btn-loading/btn-loading.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AdminComponent } from './admin/admin.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { TestComponent } from './test/test.component';
import { MatInputModule } from '@angular/material/input';
import { UserComponent } from './user/user.component';
import { ModalComponent } from './modal/modal.component';
import { UserGuardService } from './user-guard.service';
import { AdminGuardService } from './admin-guard.service';
import { AuthAdminService } from './auth-admin.service';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthUserService } from './auth-user.service';
@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    ParentComponent,
    NavbarComponent,
    BtnLoadingComponent,
    AboutComponent,
    HomeComponent,
    NotFoundComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    NoAccessComponent,
    AdminComponent,
    AddDoctorComponent,
    EditUsersComponent,
    TestComponent,
    UserComponent,
    ModalComponent,
  ], /////////Components using this module
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSliderModule,
    MatInputModule,
    MatBadgeModule,
  ], //////Modules used here
  providers: [
    UserGuardService,
    AdminGuardService,
    AuthAdminService,
    AuthUserService,
  ], ////////Advanced//////
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faCoffee);
    library.addIcons(faSync);
  }
}
