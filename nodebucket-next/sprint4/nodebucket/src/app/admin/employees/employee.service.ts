import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EmployeeViewModel } from './employee-view-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get('/api/employees')
  }

  getEmployee(empId: number) {
    return this.http.get('/api/employees/' + empId)
  }

  createEmployee(employee: Employee) {
    return this.http.post('/api/employees/', {
      employee
    })
  }

  updateEmployee(empId: number, employee: EmployeeViewModel) {
    return this.http.put('/api/employees/' + empId, {
      employee
    })
  }

  deleteEmployee(empId: number) {
    return this.http.delete('/api/employees/' + empId)
  }
}
