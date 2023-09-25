import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service'
import { Employee } from '../employee'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees: Employee[]
  successMessage: string
  errorMessage: string
  isLoading: boolean 

  constructor(private employeeService: EmployeeService) {
    this.employees = []
    this.successMessage = ''
    this.errorMessage = ''
    this.isLoading = true

    this.employeeService.getEmployees().subscribe({
      next: (employees: any) => {
        this.employees = employees
        console.log('Employee List:', this.employees)
        this.isLoading = false 
      },
      error: (err) => {
        this.errorMessage = err.message
        console.log(err)
        this.isLoading = false 
      },
      complete: () => {
        this.isLoading = false 
      }
    })
  }

  deleteEmployee(empId: number) {
    if (!confirm('Are you sure you want to delete employee record ' + empId + '?')) {
      return 
    }
    
    this.employeeService.deleteEmployee(empId).subscribe({
      next: (res) => {
        this.employees = this.employees.filter(employee => employee.empId !== empId)

        this.successMessage = 'Employee deleted successfully'

        this.hideAlert()
      },
      error: (err) => {
        this.errorMessage = err.message
        console.error(err)
        this.hideAlert()
      }
    })
  }

  hideAlert() {
    setTimeout(() => {
      this.successMessage = ''
      this.errorMessage = ''
    }, 3000)
  }
}
