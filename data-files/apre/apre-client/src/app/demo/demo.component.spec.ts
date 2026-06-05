/**
 * Author: Professor Krasso
 * Date: 8/8/2024
 * File: demo.component.spec.ts
 * Description: Test file for the demo component
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoComponent } from './demo.component';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the showCardHtml property', () => {
    expect(component.showCardHtml).toBeFalse(); // Initially false
    component.toggleProperty('showCardHtml');
    expect(component.showCardHtml).toBeTrue(); // Should be true after toggle
    component.toggleProperty('showCardHtml');
    expect(component.showCardHtml).toBeFalse(); // Should be false after another toggle
  });

  it('should update startDate when onStartDateSelected is called', () => {
    const testDate = new Date('2024-08-08');
    component.onStartDateSelected(testDate);
    expect(component.startDate).toEqual(testDate);
  });

  it('should update endDate when onEndDateSelected is called', () => {
    const testStartDate = new Date('2024-08-07');
    const testEndDate = new Date('2024-08-08');
    component.startDate = testStartDate; // Set a valid start date
    component.onEndDateSelected(testEndDate);
    expect(component.endDate).toEqual(testEndDate);
  });
});
