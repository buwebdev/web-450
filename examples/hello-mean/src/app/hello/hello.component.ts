/**
 * Title: hello.component.ts
 * Author: Professor Krasso
 * Date: 8/9/2023
 */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent {
  // local variables
  message: string
  route: string

  // Inject the HttpClient into the constructor.
  constructor (private http: HttpClient) {
    this.message = '' // initialize the message
    this.route = '' // initialize the route

    // Call the API to get the message and route from the server and display it in the view.
    this.http.get('/api/hello').subscribe({
      next: (data: any) => {
        this.message = data.message // This is the message from the server.
        this.route = data.route // This is the route from the server.
      },
      // If there is an error, log it to the console.
      error: (err: any) => {
        console.log('err', err) // This is the error from the server.
      }
    })
  }
}
