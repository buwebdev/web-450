import { Component, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [DatePipe],
  template: `
    <div class="date-picker">
      <input
        type="text"
        class="input"
        [ngClass]="{ 'input--invalid': isInvalidDate }"
        placeholder="MM/DD/YYYY"
        (focus)="showCalendar = true"
        [(ngModel)]="selectedDate"
        (ngModelChange)="onDateChange($event)"
        (keydown)="onKeyDown($event)"
      />
      <div *ngIf="showCalendar" class="calendar-popup">
        <div class="calendar">
          <div class="calendar__header">
            <button class="calendar__nav-button" (click)="debounce(prevMonth)">&#9664;</button>
            <span class="calendar__month">{{ currentDate | date: 'MMMM yyyy' }}</span>
            <button class="calendar__nav-button" (click)="debounce(nextMonth)">&#9654;</button>
          </div>

          <div class="calendar__days">
            <div *ngFor="let day of ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; trackBy: trackByIndex" class="calendar__day-name">
              {{ day }}
            </div>
            <div *ngFor="let day of daysInMonth; trackBy: trackByIndex" class="calendar__day" (click)="day && selectDate(day)">
              {{ day }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .date-picker {
      position: relative;
      display: inline-block;
    }

    .calendar-popup {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .calendar {
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 15px;
      width: 100%;
      max-width: 400px;
      background-color: white;
      position: relative;
      z-index: 1000;
      overflow: hidden;
    }

    .calendar__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #20c997;
      color: white;
      padding: 15px;
      font-size: 1.25em;
      border-radius: 8px 8px 0 0;
      width: 100%;
      box-sizing: border-box;
    }

    .calendar__nav-button {
      background: none;
      border: none;
      cursor: pointer;
      color: white;
      font-size: 1.25em;
      padding: 0 10px;
    }

    .calendar__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 5px;
      padding: 15px;
    }

    .calendar__day-name,
    .calendar__day {
      text-align: center;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .calendar__day:hover {
      background-color: #eee;
    }

    .input--invalid {
      border-color: #dc3545; /* Red color for invalid input */
    }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  @Output() dateSelected = new EventEmitter<Date>();
  currentDate = new Date();
  daysInMonth: (number | null)[] = [];
  debounceTimeout: any;
  showCalendar = false;
  selectedDate: string = ''; // Initialize selectedDate
  isInvalidDate = false; // Flag to track invalid date

  constructor(private cdr: ChangeDetectorRef) {
    this.generateCalendar(this.currentDate);
  }

  ngOnInit() {
    this.generateCalendar(this.currentDate);
  }

  generateCalendar(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = Array(firstDay).fill(null).concat(Array.from({ length: lastDate }, (_, i) => i + 1));
    this.daysInMonth = days;
    this.cdr.markForCheck();
  }

  selectDate(day: number) {
    const selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    this.selectedDate = selectedDate.toLocaleDateString();
    this.dateSelected.emit(selectedDate);
    this.showCalendar = false;
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
    this.generateCalendar(this.currentDate);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
    this.generateCalendar(this.currentDate);
  }

  debounce(func: () => void, wait = 300) {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(func.bind(this), wait);
  }

  trackByIndex(index: number, item: any): number | string {
    return item !== null ? item : `null-${index}`;
  }

  onDateChange(value: string) {
    const dateParts = value.split('/');
    this.isInvalidDate = false;

    if (dateParts.length === 3) {
      const month = parseInt(dateParts[0], 10) - 1;
      const day = parseInt(dateParts[1], 10);
      const year = parseInt(dateParts[2], 10);

      if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
        const newDate = new Date(year, month, day);
        if (newDate.getMonth() === month && newDate.getDate() === day && newDate.getFullYear() === year) {
          this.currentDate = newDate;
          this.generateCalendar(this.currentDate);
          return;
        }
      }
    }

    this.isInvalidDate = true;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.isInvalidDate) {
      this.showCalendar = false;
    }
  }
}