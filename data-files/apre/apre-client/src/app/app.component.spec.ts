/**
 * Author: Professor Krasso
 * Date: 8/8/2024
 * File: app.component.spec.ts
 * Description: Test file for the app component
 */

// Import statements
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

// Test suite
describe('AppComponent', () => {

  // Before each test
  beforeEach(async () => {
    // Configure the testing module with the router testing module and the app component
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent]
    }).compileComponents();
  });

  // Test case to verify the app component was created
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
