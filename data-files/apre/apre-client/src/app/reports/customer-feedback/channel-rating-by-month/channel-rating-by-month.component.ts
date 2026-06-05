import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ChartComponent } from '../../../shared/chart/chart.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-channel-rating-by-month',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ChartComponent],
  providers: [DatePipe],
  template: `
    <h1>Channel Rating by Month</h1>
    <div class="region-container">
      <form class="form" [formGroup]="monthForm" (ngSubmit)="onSubmit()">

        @if (errorMessage) {
          <div class="message message--error">{{ errorMessage }} </div>
        }

        <div class="form__group">
          <label class="label" for="month">Month</label>
          <select class="select" formControlName="month" id="month" name="month">
            @for(month of months; track month) {
              <option value="{{ month.value }}">{{ month.name }}</option>
            }
          </select>
        </div>
        <div class="form__actions">
          <button class="button button--primary" type="submit">Submit</button>
        </div>
      </form>

      @if (channels.length && ratingAvg.length) {
        <div class="card chart-card">
          <app-chart
            [type]="'bar'"
            [label]="'Sales by Region'"
            [data]="ratingAvg"
            [labels]="channels">
          </app-chart>
        </div>
      }
    </div>
  `,
  styles: `
    .region-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .form, .chart-card {
      width: 50%;
      margin: 20px 0;
    }
  `
})
export class ChannelRatingByMonthComponent {
  channels: string[] = [];
  ratingAvg: number[] = [];
  months: any[] = [];
  errorMessage: string;

  monthForm = this.fb.group({
    month: [null, Validators.compose([Validators.required])]
  });

  constructor(private http: HttpClient, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.months = this.loadMonths();
    this.errorMessage = '';
  }

  loadMonths() {
    return [
      { value: 1, name: 'January' },
      { value: 2, name: 'February' },
      { value: 3, name: 'March' },
      { value: 4, name: 'April' },
      { value: 5, name: 'May' },
      { value: 6, name: 'June' },
      { value: 7, name: 'July' },
      { value: 8, name: 'August' },
      { value: 9, name: 'September' },
      { value: 10, name: 'October' },
      { value: 11, name: 'November' },
      { value: 12, name: 'December' }
    ]
  }

  onSubmit() {
    if (this.monthForm.invalid) {
      this.errorMessage = 'Please select a month';
      return;
    }

    const month = this.monthForm.controls['month'].value;
    this.http.get(`${environment.apiBaseUrl}/reports/customer-feedback/channel-rating-by-month?month=${month}`).subscribe({
      next: (data: any) => {
        if (data.length === 0) {
          const selectedMonth = this.months.find(m => m.value === Number(month));
          console.error('No data found for', selectedMonth.name);
          this.errorMessage = `No data found for ${selectedMonth.name}`
          return;
        }

        this.channels = data[0].channels;
        this.ratingAvg = data[0].ratingAvg;

        console.log(`Channels: ${this.channels}\n Rating Avg: ${this.ratingAvg}`);

        this.cdr.markForCheck();
        this.cdr.detectChanges();

        this.errorMessage = ''; // Reset error message
      },
      error: (err) => {
        console.error('Error fetching channel rating by month data:', err);
      }
    });
  }
}
