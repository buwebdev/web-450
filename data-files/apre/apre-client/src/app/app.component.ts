/**
 * Author: Professor Krasso
 * Modified by: GitHub Copilot
 * Date: 8/8/2024
 * File: app.component.ts
 * Description: App component for the MEAN Stack Application
 */
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <router-outlet />
  `,
styles: `

`
})
export class AppComponent {
}
