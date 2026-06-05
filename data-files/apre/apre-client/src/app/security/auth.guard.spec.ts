import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let cookieService: CookieService;
  let router: Router;
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CookieService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });

    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow access when sessionUser cookie is set', () => {
    spyOn(cookieService, 'get').and.returnValue('someUser');
    const result = executeGuard({} as any, { url: '/some-url' } as any);
    expect(result).toBeTrue();
  });

  it('should deny access and redirect to /signin when sessionUser cookie is not set', () => {
    spyOn(cookieService, 'get').and.returnValue('');
    const result = executeGuard({} as any, { url: '/some-url' } as any);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/signin'], { queryParams: { returnUrl: '/some-url' } });
  });
});