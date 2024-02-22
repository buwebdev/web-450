/**
 * Author: Professor Krasso
 * Date: 2/21/2021
 * File Name: app-routing.module.ts
 * Description: App routing module
 */

// import statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './users/register/register.component';
import { VerifyEmailComponent } from './users/verify-email/verify-email.component';
import { VerifySecurityQuestionsComponent } from './users/verify-security-questions/verify-security-questions.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';

// routes array with the register, verify email, verify security questions, and reset password components
const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register'
  },
  {
    path: 'forgot-password',
    component: VerifyEmailComponent,
    title: 'Forgot Password'
  },
  {
    path: 'verify-security-questions',
    component: VerifySecurityQuestionsComponent,
    title: 'Verify Security Questions'
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    title: 'Reset Password'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
