/**
 * Author: Professor Krasso
 * Date: 10 September 2024
 * File: customer-feedback.component.ts
 * Description: Customer feedback component
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-feedback',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: ``
})
export class CustomerFeedbackComponent {

}
