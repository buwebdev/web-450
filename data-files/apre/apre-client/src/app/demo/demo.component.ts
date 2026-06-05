/**
 * Author: Professor Krasso
 * Date: 8/8/2024
 * File: demo.component.ts
 * Description: Demo component to illustrate how to use the global CSS classes in Angular components
 */

// Import statements
import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../shared/calendar/calendar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ChartComponent } from '../shared/chart/chart.component';
import { TableComponent } from '../shared/table/table.component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CalendarComponent, CommonModule, ChartComponent, TableComponent],
  providers: [DatePipe],
  template: `
    <h1>Global CSS Styles Demo</h1>
    <hr class="hr--light" />

    <h2>Card</h2>
    <div class="card">
      <div class="card__header">Card Header</div>
      <div class="card__body">
        <p>This is a card body content.</p>
      </div>
    </div>
    <button (click)="toggleProperty('showCardHtml')">Toggle Card HTML</button>
    <div *ngIf="showCardHtml">
      <pre>
        &lt;div class="card"&gt;
          &lt;div class="card__header"&gt;Card Header&lt;/div&gt;
          &lt;div class="card__body"&gt;
            &lt;p&gt;This is a card body content.&lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      </pre>
    </div>
    <hr class="hr--light" />

    <h2>Buttons</h2>
    <div>
      <button class="button button--primary">Primary Button</button>&nbsp;
      <button class="button button--secondary">Secondary Button</button>&nbsp;
      <button class="button button--warning">Warning Button</button>
    </div>
    <br />
    <button (click)="toggleProperty('showButtonsHtml')">Toggle Buttons HTML</button>
    <div *ngIf="showButtonsHtml">
      <pre>
        &lt;div&gt;
          &lt;button class="button button--primary"&gt;Primary Button&lt;/button&gt;&nbsp;
          &lt;button class="button button--secondary"&gt;Secondary Button&lt;/button&gt;&nbsp;
          &lt;button class="button button--warning"&gt;Warning Button&lt;/button&gt;
        &lt;/div&gt;
      </pre>
    </div>
    <hr class="hr--light" />

    <h2>Calendar</h2>
    <div class="calendar-form">
      <div class="calendar-form__group">
        <div class="calendar-form__item">
          <label class="calendar-form__label" for="startDate">Start Date:</label>
          <app-calendar (dateSelected)="onStartDateSelected($event)"></app-calendar>
        </div>
        <div class="calendar-form__item">
          <label class="calendar-form__label" for="endDate">End Date:</label>
          <app-calendar (dateSelected)="onEndDateSelected($event)"></app-calendar>
        </div>
      </div>
      <div class="calendar-form__dates">
        <p *ngIf="startDate">Start Date: <span class="calendar-form__date">{{ startDate | date }}</span></p>
        <p *ngIf="endDate">End Date: <span class="calendar-form__date">{{ endDate | date }}</span></p>
      </div>
    </div>
    <button (click)="toggleProperty('showCalendarHtml')">Toggle Calendar HTML</button>
    <div *ngIf="showCalendarHtml">
      <pre>
        &lt;div class="calendar-form"&gt;
          &lt;div class="calendar-form__group"&gt;
            &lt;div class="calendar-form__item"&gt;
              &lt;label class="calendar-form__label" for="startDate"&gt;Start Date:&lt;/label&gt;
              &lt;app-calendar (dateSelected)="onStartDateSelected($event)"&gt;&lt;/app-calendar&gt;
            &lt;/div&gt;
            &lt;div class="calendar-form__item"&gt;
              &lt;label class="calendar-form__label" for="endDate"&gt;End Date:&lt;/label&gt;
              &lt;app-calendar (dateSelected)="onEndDateSelected($event)"&gt;&lt;/app-calendar&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          &lt;div class="calendar-form__dates"&gt;
            &lt;p *ngIf="startDate"&gt;Start Date: &lt;span class="calendar-form__date"&gt;{{ startDate | date }}&lt;/span&gt;&lt;/p&gt;
            &lt;p *ngIf="endDate"&gt;End Date: &lt;span class="calendar-form__date"&gt;{{ endDate | date }}&lt;/span&gt;&lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      </pre>
    </div>
    <hr class="hr--light" />

    <h2>Messages</h2>
    <!-- Message Examples -->
    <div class="message message--error">This is an error message.</div>
    <div class="message message--info">This is an info message.</div>
    <div class="message message--success">This is a success message.</div>
    <br />
    <button (click)="toggleProperty('showMessagesHtml')">Toggle Messages HTML</button>
    <div *ngIf="showMessagesHtml">
      <pre>
        &lt;div class="message message--error"&gt;This is an error message.&lt;/div&gt;
        &lt;div class="message message--info"&gt;This is an info message.&lt;/div&gt;
        &lt;div class="message message--success"&gt;This is a success message.&lt;/div&gt;
      </pre>
    </div>
    <hr class="hr--light" />

    <h2>Form</h2>
    <form class="form">
      <div class="form__group">
        <label class="label" for="username">Username</label>
        <input class="input" type="text" id="username" name="username">
      </div>
      <div class="form__group">
        <label class="label" for="password">Password</label>
        <input class="input" type="password" id="password" name="password">
      </div>
      <div class="form__group">
        <label class="label" for="role">Role</label>
        <select class="select" id="role" name="role">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <div class="form__actions">
        <button class="button button--secondary" type="button">Cancel</button>
        <button class="button button--primary" type="submit">Submit</button>
      </div>
    </form>
    <br />
    <button (click)="toggleProperty('showFormHtml')">Toggle Form HTML</button>
    <div *ngIf="showFormHtml">
      <pre>
        &lt;form class="form"&gt;
          &lt;div class="form__group"&gt;
            &lt;label class="label" for="username"&gt;Username&lt;/label&gt;
            &lt;input class="input" type="text" id="username" name="username"&gt;
          &lt;/div&gt;
          &lt;div class="form__group"&gt;
            &lt;label class="label" for="password"&gt;Password&lt;/label&gt;
            &lt;input class="input" type="password" id="password" name="password"&gt;
          &lt;/div&gt;
          &lt;div class="form__group"&gt;
            &lt;label class="label" for="role"&gt;Role&lt;/label&gt;
            &lt;select class="select" id="role" name="role"&gt;
              &lt;option value="admin"&gt;Admin&lt;/option&gt;
              &lt;option value="user"&gt;User&lt;/option&gt;
            &lt;/select&gt;
          &lt;/div&gt;
          &lt;div class="form__actions"&gt;
            &lt;button class="button button--secondary" type="button"&gt;Cancel&lt;/button&gt;
            &lt;button class="button button--primary" type="submit"&gt;Submit&lt;/button&gt;
          &lt;/div&gt;
        &lt;/form&gt;
      </pre>
    </div>
    <hr class="hr--light" />

    <h2>Data Table</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>Admin</td>
        </tr>
        <tr>
          <td>Jane Smith</td>
          <td>User</td>
        </tr>
      </tbody>
    </table>
    <button (click)="toggleProperty('showDataTableHtml')">Toggle Data Table HTML</button>
    <div *ngIf="showDataTableHtml">
      <pre>
        &lt;table class="table"&gt;
          &lt;thead&gt;
            &lt;tr&gt;
              &lt;th&gt;Name&lt;/th&gt;
              &lt;th&gt;Role&lt;/th&gt;
            &lt;/tr&gt;
          &lt;/thead&gt;
          &lt;tbody&gt;
            &lt;tr&gt;
              &lt;td&gt;John Doe&lt;/td&gt;
              &lt;td&gt;Admin&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr&gt;
              &lt;td&gt;Jane Smith&lt;/td&gt;
              &lt;td&gt;User&lt;/td&gt;
            &lt;/tr&gt;
          &lt;/tbody&gt;
        &lt;/table&gt;
      </pre>
    </div>
    <hr class="hr--light" />

    <h2>Charts</h2>
    <!-- Chart example -->
    <div class="charts-container">
      <div class="card">
        <app-chart
          [type]="'bar'"
          [label]="'Revenue by Timeframe'"
          [data]="[10000, 20000, 30000]"
          [labels]="['Monthly', 'Quarterly', 'Yearly']">
        </app-chart>
      </div>
      <div class="card">
        <app-chart
          [type]="'pie'"
          [label]="'Sales by Region'"
          [data]="[3000, 2000, 1000, 4000]"
          [labels]="['North', 'South', 'East', 'West']">
        </app-chart>
      </div>
    </div>
    <button (click)="toggleProperty('showChartsHtml')">Toggle Charts HTML</button>
    <div *ngIf="showChartsHtml">
      <pre>
        &lt;div class="charts-container"&gt;
          &lt;div class="card"&gt;
            &lt;app-chart
              [type]="'bar'"
              [label]="'Revenue by Timeframe'"
              [data]="[10000, 20000, 30000]"
              [labels]="['Monthly', 'Quarterly', 'Yearly']"&gt;
            &lt;/app-chart&gt;
          &lt;/div&gt;
          &lt;div class="card"&gt;
            &lt;app-chart
              [type]="'pie'"
              [label]="'Sales by Region'"
              [data]="[3000, 2000, 1000, 4000]"
              [labels]="['North', 'South', 'East', 'West']"&gt;
            &lt;/app-chart&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      </pre>
    </div>
    <hr class="hr--light" />

    <h2>Data table with sorting and pagination</h2>
    <app-table
      [title]="'Sales by Region'"
      [data]="dataByRegion"
      [headers]="['Region', 'Sales']"
      [recordsPerPage]="10"
      [sortableColumns]="['Region', 'Sales']"
      [headerBackground]="'default'"> <!-- background color accepts: default, primary, secondary -->
    </app-table>
    <br />
    <button (click)="toggleProperty('showTableHtml')">Toggle Table HTML</button>
    <div *ngIf="showTableHtml">
      <pre>
        &lt;app-table
          [title]="'Sales by Region'"
          [data]="dataByRegion"
          [headers]="['Region', 'Sales']"
          [recordsPerPage]="10"
          [sortableColumns]="['Region', 'Sales']"
          [headerBackground]="'default'"&gt;
        &lt;/app-table&gt;
      </pre>
    </div>
  `,
  styles: `
    .charts-container {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }

    .card {
      width: calc(50% - 10px);
      height: 400px;
      padding: 10px;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .card app-chart {
      width: 100%;
      height: 100%;
    }

    .calendar-form {
      width: 50%;
      background: #fff;
      border: 1px solid #ddd;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      box-sizing: border-box;
      margin: 20px 0;
      min-height: 200px;
    }

    .calendar-form__group {
      display: flex;
      gap: 10px;
    }

    .calendar-form__item {
      flex: 1;
    }

    .calendar-form__label {
      padding-right: 10px;
    }

    .calendar-form__dates {
      margin-top: 20px;
    }

    .calendar-form__date {
      color: green; /* Set the text color to green */
    }
  `
})
export class DemoComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;
  showCardHtml = false;
  showButtonsHtml = false;
  showCalendarHtml = false;
  showMessagesHtml = false;
  showFormHtml = false;
  showDataTableHtml = false;
  showChartsHtml = false;
  showTableHtml = false;

  dataByRegion: any[] = [
    { 'Region': 'North', 'Sales': 3000 },
    { 'Region': 'South', 'Sales': 2000 },
    { 'Region': 'East', 'Sales': 1000 },
    { 'Region': 'West', 'Sales': 4000 }
  ]

  constructor() { }

  onStartDateSelected(date: Date) {
    this.startDate = date;
    this.logDate(date);
  }

  toggleProperty(propertyName: string) {
    (this as any)[propertyName] = !(this as any)[propertyName];
  }

  onEndDateSelected(date: Date) {
    if (this.startDate && date < this.startDate) {
      alert('End date must be after the start date.');
      return;
    }
    this.endDate = date;
    this.logDate(date);
  }

  logDate(date: Date) {
    console.log('Date selected:', date);
  }
}
