import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './@page/login/login.component';
import { RegisterComponent } from './@page/index/register/register.component';
import { HomeComponent } from './@page/index/home/home.component';
import { TestAComponent } from './@page/index/test-a/test-a.component';
import { TestBComponent } from './@page/index/test-b/test-b.component';
import { SystemAComponent } from './@page/index/system/system-a/system-a.component';
import { SystemBComponent } from './@page/index/system/system-b/system-b.component';
import { AlertComponent } from "./@com/alert/alert.component";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TestAComponent,
    TestBComponent,
    SystemAComponent,
    SystemBComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    MatExpansionModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
