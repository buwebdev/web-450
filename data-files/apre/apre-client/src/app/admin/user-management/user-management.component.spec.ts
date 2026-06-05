import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserManagementComponent } from './user-management.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementComponent, RouterTestingModule],
      providers: [
        CookieService,
        { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    spyOn(cookieService, 'get').and.returnValue(JSON.stringify({ role: 'admin' }));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should redirect to home page if user is not an admin', () => {
    const sessionUser = {
      username: 'testuser',
      role: 'user'
    };
    spyOn(cookieService, 'get').and.returnValue(JSON.stringify(sessionUser));
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should redirect to home page if sessionUser cookie is not present', () => {
    spyOn(cookieService, 'get').and.returnValue('');
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});