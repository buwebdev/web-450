import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default header and message', () => {
    const compiled = fixture.nativeElement;
    const headerElement = compiled.querySelector('.confirm-dialog__title');
    const messageElement = compiled.querySelector('.confirm-dialog__message');

    expect(headerElement.textContent).toBe('Confirm Deletion');
    expect(messageElement.textContent).toBe('Are you sure you want to delete?');
  });

  it('should display the custom header and message', () => {
    component.header = 'Custom Header';
    component.message = 'Custom Message';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const headerElement = compiled.querySelector('.confirm-dialog__title');
    const messageElement = compiled.querySelector('.confirm-dialog__message');

    expect(headerElement.textContent).toBe('Custom Header');
    expect(messageElement.textContent).toBe('Custom Message');
  });

  it('should emit true when Yes button is clicked', () => {
    spyOn(component.confirmed, 'emit');

    const compiled = fixture.nativeElement;
    const yesButton = compiled.querySelector('.button--primary');
    yesButton.click();

    expect(component.confirmed.emit).toHaveBeenCalledWith(true);
  });

  it('should emit false when No button is clicked', () => {
    spyOn(component.confirmed, 'emit');

    const compiled = fixture.nativeElement;
    const noButton = compiled.querySelector('.button--secondary');
    noButton.click();

    expect(component.confirmed.emit).toHaveBeenCalledWith(false);
  });
});
