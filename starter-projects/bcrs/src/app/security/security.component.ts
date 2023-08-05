/**
 * Title: security.component.ts
 * Author: Professor Krasso
 * Date: 8/5/23
 */

// imports statements
import { Component } from '@angular/core';

@Component({
  selector: 'app-security',
  // router outlet for the security module
  template: `
    <!-- the code here as been added to test the security module -->
    <!-- once you start building the security module, you can remove this code, but leave the router-outlet -->
    <div class='container-fluid'>
      <div class='row'>
        <div class='col'>
          <h1>Hello from the security module <span class="material-icons">waving_hand</span></h1>
        </div>

        <div class='col'>
          <router-outlet></router-outlet>
        </div>
        <a routerLink="/">Return Home</a>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class SecurityComponent {

}
