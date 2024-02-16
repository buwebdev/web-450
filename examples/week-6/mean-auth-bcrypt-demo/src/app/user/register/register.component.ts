/**
 * Author: Professor Krasso
 * Date: 2/16/2024
 * File Name: register.component.ts
 * Description: Register component
 */

// Import statements
import { Component } from '@angular/core';
import { User } from '../user.interface';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User; // User object

  // Inject the user service and router
  constructor(private userService: UserService, private router: Router) {
    this.user = {} as User; // Initialize the user object
  }

  /**
   * Register a new user
   */
  register() {
    // Call the register function from the user service
    this.userService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']); // Redirect to the login page
      },
      error: (err) => {
        console.error(err); // Log any errors
      }
    });
  }
}
