/**
 * Author: Professor Krasso
 * Date: 2/21/2021
 * File Name: app.module.ts
 * Description: App module
 */

// import statements
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './users/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './users/verify-email/verify-email.component';
import { VerifySecurityQuestionsComponent } from './users/verify-security-questions/verify-security-questions.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    VerifyEmailComponent,
    VerifySecurityQuestionsComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
