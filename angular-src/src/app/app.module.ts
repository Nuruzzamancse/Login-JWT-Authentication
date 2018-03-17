import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from "@angular/router";



import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DahsboardComponent } from './components/dahsboard/dahsboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

import {ValidateService} from "./services/validate.service";
import { AuthService} from "./services/auth.service";
import { FlashMessageModule } from "angular-flash-message";
import {AuthGaurd} from "./gaurds/auth.gaurd";

const appRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DahsboardComponent, canActivate: [AuthGaurd]},
  {path:'profile',component:ProfileComponent , canActivate: [AuthGaurd]},

]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DahsboardComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessageModule
  ],
  providers: [ValidateService,AuthService,AuthGaurd],
  bootstrap: [AppComponent]
})
export class AppModule { }
