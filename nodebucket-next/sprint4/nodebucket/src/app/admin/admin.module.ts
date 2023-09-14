import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeNewComponent } from './employees/employee-new/employee-new.component';
import { EmployeeViewComponent } from './employees/employee-view/employee-view.component';


@NgModule({
  declarations: [
    AdminComponent,
    EmployeeListComponent,
    EmployeeNewComponent,
    EmployeeViewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
