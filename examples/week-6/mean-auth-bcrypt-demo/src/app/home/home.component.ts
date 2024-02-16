/**
 * Author: Professor Krasso
 * Date: 2/16/2021
 * File Name: home.component.ts
 * Description: Home component
 */

// Import statements
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Inject the cookie service and router
  constructor(private cookieService: CookieService, private router: Router) {}

  // Logout method
  logout() {
    this.cookieService.delete('session_user'); // Delete the session_user cookie
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
