/**
 * Author: Professor Krasso
 * Date: 2/16/2024
 * File Name: auth.guard.ts
 * Description: Auth guard file
 */

// Import statements
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService); // Inject the cookie service from the ngx-cookie-service package

  /**
   * if the user is logged in, allow the route to load
   */
  if (cookie.get('session_user')) {
    return true; // Allow the route to load
  } else {
    const router = inject(Router); // Inject the router service from the @angular/router package
    router.navigate((['/login'])); // Redirect to login page
    return false; // Prevent the route from loading
  }
};
