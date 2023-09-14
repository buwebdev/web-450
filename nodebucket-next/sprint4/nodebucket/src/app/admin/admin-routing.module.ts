import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeViewComponent } from './employees/employee-view/employee-view.component';
import { EmployeeNewComponent } from './employees/employee-new/employee-new.component';
import { roleGuard } from '../shared/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'employees',
        component: EmployeeListComponent,
        title: 'Nodebucket: Employees'
      },
      {
        path: 'employees/:empId/view',
        component: EmployeeViewComponent,
        title: 'Nodebucket: Employee'
      },
      {
        path: 'employees/new',
        component: EmployeeNewComponent,
        title: 'Nodebucket: New Employee'
      }
    ],
    canActivate: [roleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
