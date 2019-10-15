import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(private http: HttpClient, private router: Router) {

  }

  title = 'Node Quiz';

  validateEmployee(employee) {
    this.http.get('/api/employees/' + employee).subscribe(res => {
      if (res) {
        this.router.navigate(['/quiz-selection']);
      } else {
        console.log('Invalid employeeId')
      }
    }, err => {
      console.log('Invalid employeeId')
    })
  }
}
