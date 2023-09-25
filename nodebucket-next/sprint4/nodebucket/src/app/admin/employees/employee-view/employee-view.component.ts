/**
 * Title: employee-view.component.ts
 * Author: Professor Krasso
 * Date: 9/5/2023
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeViewModel } from '../employee-view-model';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent {
  empId: number // define the empId variable
  employee: Employee // define the employee variable

  // define the employeeForm variable and assign it to the FormGroup
  employeeForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    role: [null, Validators.compose([Validators.required])]
  })

  // inject the ActivatedRoute, EmployeeService, Router, and FormBuilder into the constructor
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder) {

    this.employee = {} as Employee // initialize the employee model
    let l_empId = this.route.snapshot.paramMap.get('empId') || '' // get the employeeId from the route
    this.empId = parseInt(l_empId, 10) // convert the employeeId to a number

    console.log(this.empId) // log the employeeId to the console

    // if the employeeId is not a number, redirect to the employee list page
    if (isNaN(this.empId)) {
      this.router.navigate(['/admin/employees'])
    }

    // call the employeeService findEmployeeById() function and subscribe to the observable
    this.employeeService.getEmployee(this.empId).subscribe({
      next: (employee: any) => {
        this.employee = employee // assign the results to the employee model
        console.log(this.employee) // log the results to the console
      },
      error: (err) => {
        console.error(err)
      },
      complete: () => {
        this.employeeForm.controls['firstName'].setValue(this.employee.firstName)
        this.employeeForm.controls['lastName'].setValue(this.employee.lastName)
        this.employeeForm.controls['role'].setValue(this.employee.role)
      }
    })
  }

  // updateEmployee() function definition that accepts no parameters and returns nothing (void)
  updateEmployee() {
    let employee = {} as EmployeeViewModel // initialize the employee view model

    // assign the values from the form to the employee view model
    employee.firstName = this.employeeForm.controls['firstName'].value
    employee.lastName = this.employeeForm.controls['lastName'].value
    employee.role = this.employeeForm.controls['role'].value

    console.log('Employee ViewModel: ', employee) // log the employee view model to the console

    // call the employeeService updateEmployee() function and subscribe to the observable
    this.employeeService.updateEmployee(this.empId, employee).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['/admin/employees']) // redirect to the employee list page
      },
      error: (err) => {
        console.error(err) // log the error to the console
      }
    })
  }
}
