import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChannelRatingByMonthComponent } from './channel-rating-by-month.component';

describe('ChannelRatingByMonthComponent', () => {
  let component: ChannelRatingByMonthComponent;
  let fixture: ComponentFixture<ChannelRatingByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ChannelRatingByMonthComponent] // Import ChannelRatingByMonthComponent
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelRatingByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title "Channel Rating by Month"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Channel Rating by Month');
  });

  it('should initialize the monthForm with a null value', () => {
    const monthControl = component.monthForm.controls['month'];
    expect(monthControl.value).toBeNull();
    expect(monthControl.valid).toBeFalse();
  });

  it('should display an error message if the form is submitted without selecting a month', () => {
    component.onSubmit();
    fixture.detectChanges(); // Update the view

    const compiled = fixture.nativeElement;
    const errorMessageElement = compiled.querySelector('.message--error');
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.textContent).toContain('Please select a month');
  });
});