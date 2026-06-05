import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserCreateComponent } from './user-create.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        UserCreateComponent // Import the standalone component
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            events: of({}), // Mock router events
            navigate: jasmine.createSpy('navigate'),
            createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue({}),
            serializeUrl: jasmine.createSpy('serializeUrl').and.returnValue(''),
            routerState: {
              snapshot: {
                root: {}
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the component and initialize the form', () => {
    expect(component).toBeTruthy();
    expect(component.newUserForm).toBeTruthy();
    expect(component.newUserForm.controls['username']).toBeTruthy();
    expect(component.newUserForm.controls['password']).toBeTruthy();
    expect(component.newUserForm.controls['email']).toBeTruthy();
    expect(component.newUserForm.controls['role']).toBeTruthy();
  });

  it('should set errorMessage when form is invalid on addUser call', () => {
    // Set form values to invalid state
    component.newUserForm.controls['username'].setValue('');
    component.newUserForm.controls['password'].setValue('');
    component.newUserForm.controls['email'].setValue('');
    component.newUserForm.controls['role'].setValue('');

    // Call the addUser method
    component.addUser();

    // Verify that the errorMessage is set
    expect(component.errorMessage).toBe('Please fill in all fields.');
  });

  it('should navigate to /user-management/users on successful user creation', () => {
    // Mock the HTTP POST request to return a successful response
    spyOn(component['http'], 'post').and.returnValue(of({}));

    // Set form values to valid state
    component.newUserForm.controls['username'].setValue('testuser');
    component.newUserForm.controls['password'].setValue('Password123');
    component.newUserForm.controls['email'].setValue('testuser@example.com');
    component.newUserForm.controls['role'].setValue('admin');

    // Call the addUser method
    component.addUser();

    // Verify that the router's navigate method was called with the correct arguments
    expect(router.navigate).toHaveBeenCalledWith(['/user-management/users']);
  });
});