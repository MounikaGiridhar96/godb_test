import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './registration/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { AuthenticationService, UserService, AlertService } from './services';
import { LoginModule } from './login/login.module';
import { RegistrationModule } from './registration/registration.module';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    RegistrationModule

  ],
  providers: [HttpClient,AuthenticationService,UserService,AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
