import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportComponent } from './support.component';

describe('SupportComponent', () => {
  let component: SupportComponent;
  let fixture: ComponentFixture<SupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title and description', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('.support__title');
    const descriptionElement = compiled.querySelector('.support__description');

    expect(titleElement.textContent).toBe('Help & Support');
    expect(descriptionElement.textContent).toBe('If you need assistance, please contact our support team:');
  });

  it('should display the contact support card with correct information', () => {
    const compiled = fixture.nativeElement;
    const cardHeader = compiled.querySelector('.support__card-header');
    const emailElement = compiled.querySelector('.support__card-content a');
    const phoneElement = compiled.querySelector('.support__card-content:nth-child(2)');

    expect(cardHeader.textContent).toBe('Contact Support');
    expect(emailElement.textContent).toBe('support@example.com');
    expect(emailElement.getAttribute('href')).toBe('mailto:support@example.com');
    expect(phoneElement.textContent).toContain('+1 (555) 123-4567');
  });

  it('should display the documentation card with correct links', () => {
    const compiled = fixture.nativeElement;
    const cardHeader = compiled.querySelectorAll('.support__card-header')[1];
    const listItems = compiled.querySelectorAll('.support__card-list-item a');

    expect(cardHeader.textContent).toBe('Documentation');
    expect(listItems.length).toBe(3);
    expect(listItems[0].textContent).toBe('Getting Started');
    expect(listItems[0].getAttribute('href')).toBe('https://example.com/docs/getting-started');
    expect(listItems[1].textContent).toBe('User Guide');
    expect(listItems[1].getAttribute('href')).toBe('https://example.com/docs/user-guide');
    expect(listItems[2].textContent).toBe('API Reference');
    expect(listItems[2].getAttribute('href')).toBe('https://example.com/docs/api-reference');
  });
});
