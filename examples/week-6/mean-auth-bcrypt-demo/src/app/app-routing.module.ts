/**
 * Author: Professor Krasso
 * Date: 2/16/2024
 * File Name: app-routing.module.ts
 * Description: App routing module
 */

// Import statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { authGuard } from './guards/auth.guard';

// Routes array with path, component, and title properties
const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home', canActivate: [authGuard]},
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'login', component: LoginComponent, title: 'Login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
