import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  template: `
     <div class="faq">
      <h2 class="faq__title">Frequently Asked Questions</h2>
      <p class="faq__description">Here are some common questions and answers about the report tool:</p>

      <div class="faq__cards">
        <div class="card faq__card">
          <div class="card__header faq__card-header">What is the purpose of the Users Collection?</div>
          <div class="card__body faq__card-body">
            <p class="faq__card-content">The Users Collection stores information about users, including their username, password hash, email, role, and timestamps for when the user was created and last updated.</p>
          </div>
        </div>

        <div class="card faq__card">
          <div class="card__header faq__card-header">How are agents identified in the Agents Collection?</div>
          <div class="card__body faq__card-body">
            <p class="faq__card-content">Agents are identified by a unique agentId, which is a number between 1000 and 1010. The collection also includes details such as name, email, phone, region, supervisorId, team, and timestamps.</p>
          </div>
        </div>

        <div class="card faq__card">
          <div class="card__header faq__card-header">What kind of data is stored in the Sales Collection?</div>
          <div class="card__body faq__card-body">
            <p class="faq__card-content">The Sales Collection stores data related to sales transactions, including the date, region, product, category, customer, salesperson, channel, and the amount of the sale.</p>
          </div>
        </div>

        <div class="card faq__card">
          <div class="card__header faq__card-header">What metrics are tracked in the Agent Performance Collection?</div>
          <div class="card__body faq__card-body">
            <p class="faq__card-content">The Agent Performance Collection tracks various performance metrics for agents, such as metric type, value, customer feedback, call duration, and resolution time. It also includes the date, region, supervisorId, team, and agentId.</p>
          </div>
        </div>

        <div class="card faq__card">
          <div class="card__header faq__card-header">What information is captured in the Customer Feedback Collection?</div>
          <div class="card__body faq__card-body">
            <p class="faq__card-content">The Customer Feedback Collection captures feedback from customers, including the date, region, product, category, channel, salesperson, customer, rating, agentId, feedback type, performance metrics, sales amount, feedback length, sentiment, text, source, and status.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .faq {
      padding: 20px;
      font-family: 'Roboto', sans-serif; /* Use global font */
      color: #333; /* Default text color */
    }

    .faq__title {
      color: #20c997; /* Match card header background color */
    }

    .faq__description {
      margin-bottom: 20px;
    }

    .faq__cards {
      display: flex;
      gap: 20px;
      flex-wrap: wrap; /* Ensure cards wrap on smaller screens */
    }

    .faq__card {
      flex: 1 1 calc(50% - 20px); /* Two cards per row with a gap of 20px */
      margin-bottom: 20px;
    }

    .faq__card-header {
      background-color: #20c997; /* Match card header background color */
      color: white;
      padding: 15px;
      font-size: 1.25em;
    }

    .faq__card-body {
      padding: 15px;
    }

    .faq__card-content {
      margin: 10px 0;
    }
  `
})
export class FaqComponent {

}
