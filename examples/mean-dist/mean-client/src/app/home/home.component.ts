import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <p>
      Welcome to the Homepage! Here you will find all the information you need to get started with the MEAN stack.
    </p>
    <p><strong>Message from the server:</strong> {{ serverMessage }} </p>
  `,
  styles: ``
})
export class HomeComponent {
  serverMessage: string;

  constructor(private http: HttpClient) {
    this.serverMessage = 'Loading...';

    this.http.get('http://localhost:3000/api/hello').subscribe((data: any) => {
      setTimeout(() => {
        this.serverMessage = data.message;
        console.log(data);
      }, 2000); // Simulate a slow connection
    });
  }
}
