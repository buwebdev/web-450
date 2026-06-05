/**
 * Author: Professor Krasso
 * Date: 10 September 2024
 * File: support.component.ts
 * Description: Support component
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [],
  template: `
    <div class="support">
      <h2 class="support__title">Help & Support</h2>
      <p class="support__description">If you need assistance, please contact our support team:</p>

      <div class="support__cards">
        <div class="card support__card">
          <div class="card__header support__card-header">Contact Support</div>
          <div class="card__body support__card-body">
            <p class="support__card-content">Email: <a href="mailto:support@example.com">support&#64;example.com</a></p>
            <p class="support__card-content">Phone: +1 (555) 123-4567</p>
          </div>
        </div>

        <div class="card support__card">
          <div class="card__header support__card-header">Documentation</div>
          <div class="card__body support__card-body">
            <ul class="support__card-list">
              <li class="support__card-list-item"><a href="https://example.com/docs/getting-started" target="_blank">Getting Started</a></li>
              <li class="support__card-list-item"><a href="https://example.com/docs/user-guide" target="_blank">User Guide</a></li>
              <li class="support__card-list-item"><a href="https://example.com/docs/api-reference" target="_blank">API Reference</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .support {
      padding: 20px;
      font-family: 'Roboto', sans-serif; /* Use global font */
      color: #333; /* Default text color */
    }

    .support__title {
      color: #20c997; /* Match card header background color */
    }

    .support__description {
      margin-bottom: 20px;
    }

    .support__cards {
      display: flex;
      gap: 20px;
      flex-wrap: wrap; /* Ensure cards wrap on smaller screens */
    }

    .support__card {
      flex: 1 1 calc(50% - 20px); /* Two cards per row with a gap of 20px */
      margin-bottom: 20px;
    }

    .support__card-header {
      background-color: #20c997; /* Match card header background color */
      color: white;
      padding: 15px;
      font-size: 1.25em;
    }

    .support__card-body {
      padding: 15px;
    }

    .support__card-content {
      margin: 10px 0;
    }

    .support__card-list {
      list-style-type: none;
      padding: 0;
    }

    .support__card-list-item {
      margin-bottom: 10px;
    }
  `
})
export class SupportComponent {

}
