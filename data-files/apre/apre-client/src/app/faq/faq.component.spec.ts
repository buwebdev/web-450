import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqComponent } from './faq.component';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the FAQ title', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('.faq__title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Frequently Asked Questions');
  });

  it('should display the FAQ description', () => {
    const compiled = fixture.nativeElement;
    const descriptionElement = compiled.querySelector('.faq__description');
    expect(descriptionElement).toBeTruthy();
    expect(descriptionElement.textContent).toContain('Here are some common questions and answers about the report tool:');
  });

  it('should display all FAQ cards', () => {
    const compiled = fixture.nativeElement;
    const cardElements = compiled.querySelectorAll('.faq__card');
    expect(cardElements.length).toBe(5); // Check if there are 5 FAQ cards
  });
});
