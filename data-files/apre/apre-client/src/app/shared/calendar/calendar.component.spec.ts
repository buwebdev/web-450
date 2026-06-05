import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the calendar popup when the input is focused', () => {
    const compiled = fixture.nativeElement;
    const inputElement = compiled.querySelector('.input');
    inputElement.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    const calendarPopup = compiled.querySelector('.calendar-popup');
    expect(calendarPopup).toBeTruthy();
  });

  it('should emit the selected date when a day is clicked', () => {
    spyOn(component.dateSelected, 'emit');
    component.generateCalendar(new Date(2024, 8, 1)); // Generate calendar for September 2024
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const inputElement = compiled.querySelector('.input');
    inputElement.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    const calendarPopup = compiled.querySelector('.calendar-popup');
    expect(calendarPopup).toBeTruthy(); // Ensure the calendar popup is visible

    const dayElements = compiled.querySelectorAll('.calendar__day');
    console.log('Day Elements:', dayElements);

    expect(dayElements.length).toBeGreaterThan(0); // Ensure there are day elements

    const dayElement = dayElements[0];
    dayElement.click();
    fixture.detectChanges();

    expect(component.dateSelected.emit).toHaveBeenCalled();
  });

  it('should mark the input as invalid for an incorrect date format', () => {
    const compiled = fixture.nativeElement;
    const inputElement = compiled.querySelector('.input');
    inputElement.value = '13/32/2024';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.isInvalidDate).toBeTrue();
    expect(inputElement.classList).toContain('input--invalid');
  });
});
