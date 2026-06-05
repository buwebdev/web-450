import { Component } from '@angular/core';
import { CalendarComponent } from '../../../shared/calendar/calendar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ChartComponent } from '../../../shared/chart/chart.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-call-duration-by-date-range',
  standalone: true,
  imports: [CalendarComponent, CommonModule, ChartComponent],
  providers: [DatePipe],
  template: `
    <div>
      <h1>Call Duration By Date Range</h1>
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
        <div class="calendar-form__actions">
          <button class="button button--primary" (click)="fetchPerformanceData()">Submit</button>
        </div>
      </div>

      <br />
      <div *ngIf="showChart" class="chart-container">
        <div class="card chart-card">
          <app-chart
            [type]="'bar'"
            [label]="'Agent Performance'"
            [data]="callDurationData"
            [labels]="agents">
          </app-chart>
        </div>
      </div>
    </div>
  `,
  styles: `
    .calendar-form {
      width: 50%;
      background: #fff;
      border: 1px solid #ddd;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      box-sizing: border-box;
      margin: 20px 0;
      min-height: 200px;
      margin: 0 auto;
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

    .calendar-form__actions .button {
      margin-top: 10%;
      width: 100%;
    }

    .chart-container {
      width: 50%;
      margin: 0 auto;
    }

    .chart-card {
      width: 100%;
      margin: 20px 0;
    }
  `
})
export class CallDurationByDateRangeComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;
  callDurationData: number[] = []; // Initially empty
  agents: string[] = []; // Initially empty
  showChart: boolean = false; // Initially hidden

  constructor(private http: HttpClient) {

  }

  onStartDateSelected(date: Date) {
    this.startDate = date;
    this.logDate(date);
  }

  onEndDateSelected(date: Date) {
    if (this.startDate && date < this.startDate) {
      alert('End date must be after the start date.');
      return;
    }

    this.endDate = date;
    this.logDate(date);
  }

  fetchPerformanceData() {
    if (this.startDate && this.endDate) {

      // Convert the dates to ISO 8601 strings
      const startDateISO = this.startDate.toISOString();
      const endDateISO = this.endDate.toISOString();

      console.log('Fetching performance data for dates:', startDateISO, endDateISO);

      this.http.get(`${environment.apiBaseUrl}/reports/agent-performance/call-duration-by-date-range?startDate=${startDateISO}&endDate=${endDateISO}`).subscribe({
        next: (data: any) => {
          this.callDurationData = data[0].callDurations;
          this.agents = data[0].agents;
          console.log(data[0]);
          console.log('Agents: ', data[0].agents);
          console.log('Call durations: ', data[0].callDurations);
        },
        error: (error: any) => {
          console.error('Error fetching call duration by date range data:', error);
        },
        complete: () => {
          this.showChart = true; // Show chart after fetching data
        }
      });
    } else {
      alert('Please select both start and end dates.');
    }
  }

  logDate(date: Date) {
    console.log('Date selected:', date);
  }
}
