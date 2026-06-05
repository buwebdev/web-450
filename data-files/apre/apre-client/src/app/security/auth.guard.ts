/**
 * Author: Professor Krasso
 * Date: 10 September 2024
 * File: auth.guard.ts
 * Description: Auth guard
 *  This file is used to protect routes from unauthorized access. If a user is not logged in, they will be redirected to the sign-in page.
 */


import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService); // Inject the cookie service

  // Check if the sessionUser cookie is set
  if (cookieService.get('sessionUser')) {
    return true; // User is logged in
  } else {
    // User is not logged in
    const router = inject(Router); // Inject the router service
    router.navigate(['/signin'], {queryParams: {returnUrl: state.url}}); // Redirect the user to the sign-in page
    return false; // Return false
  }
};
