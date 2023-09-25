import { EmployeeService } from './../employee.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css']
})
export class EmployeeNewComponent {
  errorMessage: string 

  employeeForm: FormGroup = this.fb.group({
    empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])],
    role: [null, Validators.compose([Validators.required])]
  })

  constructor (private fb: FormBuilder, private router: Router, private employeeService: EmployeeService) {
    this.errorMessage = ''
  }

  createEmployee() {
    const employee: Employee = {
      empId: parseInt(this.employeeForm.controls['empId'].value, 10),
      firstName: this.employeeForm.controls['firstName'].value,
      lastName: this.employeeForm.controls['lastName'].value,
      email: this.employeeForm.controls['email'].value,
      password: this.employeeForm.controls['password'].value,
      role: this.employeeForm.controls['role'].value
    }

    this.employeeService.createEmployee(employee).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['/admin/employees'])
      },
      error: (err) => {
        if (err.error.message) {
          this.errorMessage = err.error.message
        } else {
          this.errorMessage = 'Something went wrong, please contact system admin'
        }
      }
    })
  }
}
