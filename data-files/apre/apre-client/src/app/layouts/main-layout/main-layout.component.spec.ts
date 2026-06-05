import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainLayoutComponent } from './main-layout.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let httpMock: HttpTestingController;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MainLayoutComponent // Import the standalone component
      ],
      providers: [
        CookieService,
        {
          provide: CookieService,
          useValue: {
            get: jasmine.createSpy('get').and.returnValue(JSON.stringify({ username: 'testuser', role: 'admin' })),
            deleteAll: jasmine.createSpy('deleteAll')
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title in the side menu', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('.app__side-menu-title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('APRE');
  });

  it('should display the user initial in the user avatar', () => {
    const sessionUser = JSON.parse(cookieService.get('sessionUser'));
    const userInitial = sessionUser.username.charAt(0).toUpperCase();

    const compiled = fixture.nativeElement;
    const avatarElement = compiled.querySelector('.app__user-avatar');
    expect(avatarElement).toBeTruthy();
    expect(avatarElement.textContent).toContain(userInitial);
  });

  it('should call signout and navigate to /signin when Sign Out is clicked', () => {
    spyOn(component, 'signout').and.callThrough();
    spyOn(router, 'navigate');

    const compiled = fixture.nativeElement;
    const userProfile = compiled.querySelector('.app__user-profile');
    userProfile.click(); // Simulate click to show the dropdown

    fixture.detectChanges(); // Update the view

    const signOutLink = compiled.querySelector('.app__user-dropdown-link:last-child');
    signOutLink.click();

    expect(component.signout).toHaveBeenCalled();
    expect(cookieService.deleteAll).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/signin']);
  });
});