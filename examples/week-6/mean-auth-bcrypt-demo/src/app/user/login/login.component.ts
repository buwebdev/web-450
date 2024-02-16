/**
 * Author: Professor Krasso
 * Date: 2/16/2021
 * File Name: login.component.ts
 * Description: Login component
 */

// Import statements
import { Component } from '@angular/core';
import { User } from '../user.interface';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User; // User object
  errorMessage: string; // Error message

  // Inject the user service and router
  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) {
    this.user = {} as User; // Initialize the user object
    this.errorMessage = ''; // Initialize the error message
  }

  // Login method
  login() {
    this.userService.login(this.user).subscribe({
      next: (response) => {
        // Add the user to a cookie using the ngx-cookie-service
        this.cookieService.set('session_user', this.user.email, 1); // Expires in 1 day

        // If the login is successful, redirect to the home page
        this.router.navigate(['/']);
      },
      error: (error) => {
        // If the login fails, log the error
        console.error(error);
        this.errorMessage = 'The email or password is incorrect';
      }
    });
  }
}
