import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <router-outlet />
  `,
  styles: ``
})
export class UserManagementComponent {
  sessionUser: any;

  constructor(private cookieService: CookieService, private router: Router) {
    const sessionUserCookie = this.cookieService.get('sessionUser');
    if (sessionUserCookie) {
      try {
        this.sessionUser = JSON.parse(sessionUserCookie);
      } catch (e) {
        console.error('Error parsing sessionUser cookie:', e);
      }
    }

    if (!this.sessionUser || this.sessionUser.role !== 'admin') {
      console.log('User is not an admin and cannot access user management. Redirecting to home page.');
      this.router.navigate(['/']);
    }
  }
}
