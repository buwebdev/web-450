import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SigninComponent] // Import SigninComponent
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title "Sign In"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('.signin__title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Sign In');
  });

  it('should initialize the signinForm with null values', () => {
    const usernameControl = component.signinForm.controls['username'];
    const passwordControl = component.signinForm.controls['password'];
    expect(usernameControl.value).toBeNull();
    expect(passwordControl.value).toBeNull();
    expect(usernameControl.valid).toBeFalse();
    expect(passwordControl.valid).toBeFalse();
  });

  it('should not submit the form if fields are not filled', () => {
    spyOn(component, 'signin').and.callThrough();

    const compiled = fixture.nativeElement;
    const submitButton = compiled.querySelector('.signin__button');
    submitButton.click();

    expect(component.signin).toHaveBeenCalled();
    expect(component.signinForm.valid).toBeFalse();
    expect(component.errorMessage).toBe('Please fill in all fields.');
  });
});