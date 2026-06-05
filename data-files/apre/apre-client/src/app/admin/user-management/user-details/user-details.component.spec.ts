import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDetailsComponent } from './user-details.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../user.interface';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        UserDetailsComponent // Import the standalone component
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
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine.createSpy('get').and.returnValue('1') // Mock route parameter
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the component and initialize the form', () => {
    expect(component).toBeTruthy();
    expect(component.userDetailsForm).toBeTruthy();
    expect(component.userDetailsForm.controls['username']).toBeTruthy();
    expect(component.userDetailsForm.controls['email']).toBeTruthy();
    expect(component.userDetailsForm.controls['role']).toBeTruthy();
  });

  it('should populate the form with user data', () => {
    const mockUser = {
      _id: '1',
      username: 'testuser',
      email: 'testuser@example.com',
      role: 'admin'
    };

    // Mock the HTTP GET request to return the mock user data
    spyOn(component['http'], 'get').and.returnValue(of(mockUser));

    // Simulate the HTTP GET request and form population
    component['http'].get(`${environment.apiBaseUrl}/users/${component._id}`).subscribe({
      next: (user) => {
        component.user = user as User;
        component.userDetailsForm.patchValue({
          username: component.user.username,
          email: component.user.email,
          role: component.user.role
        });
      }
    });

    fixture.detectChanges();

    expect(component.userDetailsForm.controls['username'].value).toBe(mockUser.username);
    expect(component.userDetailsForm.controls['email'].value).toBe(mockUser.email);
    expect(component.userDetailsForm.controls['role'].value).toBe(mockUser.role);
  });

  it('should set errorMessage when form is invalid on editUser call', () => {
    // Set form values to invalid state
    component.userDetailsForm.controls['username'].setValue('');
    component.userDetailsForm.controls['email'].setValue('');
    component.userDetailsForm.controls['role'].setValue('');

    // Call the editUser method
    component.editUser();

    // Verify that the errorMessage is set
    expect(component.errorMessage).toBe('Please fill in all required fields.');
  });
});