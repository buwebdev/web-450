/**
 * Author: Professor Krasso
 * Modified by: GitHub Copilot
 * Date: 8/8/2024
 * File: main-layout.component.ts
 * Description: Main layout of the MEAN Stack Application
 */
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
   <div class="app">
    <nav class="app__side-menu">
      <div class="app__side-menu-header">
        <h2 class="app__side-menu-title">{{ title }}</h2>
      </div>
      <a class="app__side-menu-link" routerLink="/">Dashboard</a>
      <a class="app__side-menu-link" routerLink="/support">Support</a>
      <a class="app__side-menu-link" routerLink="/faq">FAQ</a>

      @if (sessionUser.role === 'admin') {
        <div class="app__side-menu-section" (click)="toggleSection($event, 'userManagement')">
        <div class="app__side-menu-link">User Management</div>
          @if (sections.userManagement) {
            <div class="app__side-menu-sub-links">
              @for (link of userManagement; track link) {
                <a class="app__side-menu-link app__side-menu-sub-link" [routerLink]="link.url">{{ link.name }}</a>
              }
            </div>
          }
        </div>
      }

      <div class="app__side-menu-section" (click)="toggleSection($event, 'salesReports')">
        <div class="app__side-menu-link">Sales Reports</div>
        @if (sections.salesReports) {
          <div class="app__side-menu-sub-links">
            @for (link of salesReports; track link) {
              <a class="app__side-menu-link app__side-menu-sub-link" [routerLink]="link.url">{{ link.name }}</a>
            }
          </div>
        }
      </div>

      <div class="app__side-menu-section" (click)="toggleSection($event, 'agentPerformanceReports')">
        <div class="app__side-menu-link">Agent Performance Reports</div>

        @if (sections.agentPerformanceReports) {
          <div class="app__side-menu-sub-links">
            @for (link of agentPerformanceReports; track link) {
              <a class="app__side-menu-link app__side-menu-sub-link" [routerLink]="link.url">{{ link.name }}</a>
            }
          </div>
        }
      </div>

      <div class="app__side-menu-section" (click)="toggleSection($event, 'customerFeedbackReports')">
        <div class="app__side-menu-link">Customer Feedback Reports</div>

        @if (sections.customerFeedbackReports) {
          <div class="app__side-menu-sub-links">
            @for (link of customerFeedbackReports; track link) {
              <a class="app__side-menu-link app__side-menu-sub-link" [routerLink]="link.url">{{ link.name }}</a>
            }
          </div>
        }
      </div>
    </nav>

    <div class="app__main-content">
      <header class="app__header">
        <div class="app__header-content">
          <div class="app__header-title"></div>
          <div class="app__user-profile" (click)="toggleDropdown()">
            <div class="app__user-avatar">{{ userInitial }}</div>
            <div class="app__user-arrow" [class.up]="dropdownVisible">&#9660;</div>
            <div class="app__user-dropdown" [class.show]="dropdownVisible">
              <span>Welcome {{ sessionUser.username }}!</span>

              <hr class="lighter-hr" />

              @if (sessionUser.role === 'admin') {
                <a class="app__user-dropdown-link" routerLink="/demo">Styling Demo</a>
              }

              <a class="app__user-dropdown-link" (click)="signout();">Sign Out</a>
              <!-- Add more links as needed -->
            </div>
          </div>
        </div>
      </header>
      <main class="app__main">
        <router-outlet></router-outlet>
      </main>
    </div>

    <footer class="app__footer">
      &copy; 2024 Agent Performance Reporting Engine (APRE)
    </footer>
  </div>
  `,
  styles: `
    .app {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .app__side-menu {
      width: 250px;
      background-color: white; /* White background */
      color: #4e4a4a; /* Text color */
      padding: 0;
      height: 100vh;
      position: fixed;
      border-top-right-radius: 8px; /* Rounded top-right corner */
      border-bottom-right-radius: 8px; /* Rounded bottom-right corner */
      box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1); /* Card-like shadow on the right */
    }

    .app__side-menu-header {
      background-color: #20c997; /* Match avatar background color */
      padding: 20px 10px; /* Reverted padding */
      border-bottom: 1px solid #ddd;
    }

    .app__side-menu-title {
      margin: 0;
      color: white; /* White text color */
    }

    .app__side-menu-link {
      display: block;
      padding: 10px 20px;
      color: #4e4a4a; /* Text color */
      text-decoration: none;
      border-bottom: 1px solid #ddd;
    }

    .app__side-menu-link:hover {
      background-color: #f2f5f7; /* Hover background color */
    }

    .app__side-menu-section {
      cursor: pointer;
    }

    .app__side-menu-sub-links {
      padding-left: 20px; /* Indentation for sub-links */
    }

    .app__side-menu-sub-link {
      padding: 5px 20px;
    }

    .app__side-menu-sub-link:hover {
      background-color: #e9ecef; /* Hover background color for sub-links */
    }

    .app__user-arrow {
      font-size: 1em;
      color: #4e4a4a;
      transition: transform 0.3s ease;
    }

    .app__user-arrow.up {
      transform: rotate(180deg);
    }

    .app__main-content {
      margin-left: 250px; /* Align with the width of the side menu */
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: #f2f5f7; /* Main content background color */
      color: #4e4a4a; /* Text color */
    }

    .app__header {
      background-color: #20c997; /* Header background color */
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .app__header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .app__header-title {
      font-size: 1.5em;
      color: white; /* White text color */
    }

    .app__user-profile {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .app__user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f2f5f7; /* Avatar background color */
      color: #1b5e20; /* Darker green for initials */
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1em;
      margin-right: 3px; /* Reduced margin */
      border: 2px solid #000; /* Black border */
    }

    .app__user-arrow {
      font-size: 1em;
      color: white;
      transition: transform 0.3s ease;
    }

    .app__user-arrow.up {
      transform: rotate(180deg);
    }

    .app__user-dropdown {
      display: none;
      position: absolute;
      right: 0;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 10px;
      z-index: 1;
      min-width: 150px; /* Adjust this width as needed */
      top: 50px; /* Adjust this value to position the dropdown below the circle */
      white-space: nowrap; /* Prevents text from wrapping */
    }

    .app__user-dropdown.show {
      display: block;
    }

    .app__user-dropdown-link {
      color: black;
      text-decoration: none;
      display: block;
      padding: 5px 10px; /* Adjust padding as needed */
    }

    .app__user-dropdown-link:hover {
      background-color: #f1f1f1; /* Hover background color */
    }

    .app__main {
      flex: 1;
      padding: 20px;
    }

    .app__footer {
      text-align: center;
      background-color: white; /* Footer background color */
      color: #4e4a4a; /* Text color */
      padding: 10px;
      margin-top: auto;
      border-top-left-radius: 8px; /* Rounded top-left corner */
      border-top-right-radius: 8px; /* Rounded top-right corner */
      box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1); /* Card-like shadow on the top */
    }

    .lighter-hr {
      border: 0;
      height: 1px;
      background: #e0e0e0;
    }
  `
})
export class MainLayoutComponent {
  title = 'APRE'; // Title of the application displayed in the side menu
  dropdownVisible = false; // Variable to keep track of the visibility of the user dropdown menu
  sessionUser: any; // Placeholder for the session user
  userInitial: string;

  // Object to keep track of the visibility of the sub-sections in the side menu
  sections: any = {
    salesReports: false,
    agentPerformanceReports: false,
    customerFeedbackReports: false,
    userManagement: false
  };

  // Array to hold the user management links in the side menu. Must be an admin to see these links
  userManagement = [
    { name: 'Users', url: '/user-management/users' },
    { name: 'Create User', url: '/user-management/users/new' },
  ];

  // Array to hold the sales reports links in the side menu. These links are visible to all users
  salesReports = [
    { name: 'Sales by Region', url: '/reports/sales/sales-by-region' },
    { name: 'Sales by Region - Tabular', url: '/reports/sales/sales-by-region-tabular' },
    // Add more reports as needed
  ];

  agentPerformanceReports = [
    { name: 'Call Duration by Date Range', url: '/reports/agent-performance/call-duration-by-date-range' }
    // Add more reports as needed
  ];

  customerFeedbackReports = [
    { name: 'Channel Rating by Month', url: '/reports/customer-feedback/channel-rating-by-month' }
    // Add more reports as needed
  ];

  constructor(private cookieService: CookieService, private router: Router) {
    this.sessionUser = JSON.parse(this.cookieService.get('sessionUser'));
    this.userInitial = this.sessionUser ? this.sessionUser.username.slice(0, 1) : '';
    this.userInitial = this.userInitial.toUpperCase();
    console.log(this.userInitial)
  }

  // Function to toggle the user dropdown menu
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Function to toggle the visibility of the sub-sections in the side menu
  toggleSection(event: MouseEvent, section: string) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('app__side-menu-link') && !target.classList.contains('app__side-menu-sub-link')) {
      this.sections[section] = !this.sections[section];
    }
  }

  signout() {
    this.cookieService.deleteAll();
    this.router.navigate(['/signin'])
  }
}
