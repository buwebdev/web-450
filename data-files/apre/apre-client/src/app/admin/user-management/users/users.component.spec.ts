import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { UsersComponent } from './users.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
      events: new Subject(), // Mock the events observable
      createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue({}), // Mock createUrlTree method
      serializeUrl: jasmine.createSpy('serializeUrl').and.returnValue('') // Mock serializeUrl method
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UsersComponent, RouterLink, ConfirmDialogComponent], // Import UsersComponent and other dependencies
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }, // Mock ActivatedRoute
        { provide: Router, useValue: mockRouter } // Use the mock Router
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set dialog properties correctly when confirmDelete is called', () => {
    const userId = '123';
    component.confirmDelete(userId);
    expect(component.dialogHeader).toBe('Confirm Deletion');
    expect(component.dialogMessage).toBe('Are you sure you want to delete user: ' + userId + '?');
    expect(component.userIdToDelete).toBe(userId);
    expect(component.showConfirmDialog).toBeTrue();
  });

  it('should call deleteUser when onConfirm is called with true', () => {
    const userId = '123';
    spyOn(component, 'deleteUser'); // Spy on the deleteUser method
    component.userIdToDelete = userId;

    component.onConfirm(true);

    expect(component.deleteUser).toHaveBeenCalledWith(userId);
    expect(component.showConfirmDialog).toBeFalse();
    expect(component.userIdToDelete).toBeNull();
  });

  it('should set showConfirmDialog to false when onConfirm is called with false', () => {
    component.showConfirmDialog = true; // Set initial value to true

    component.onConfirm(false);

    expect(component.showConfirmDialog).toBeFalse();
  });

  it('should display users in the table', () => {
    // Mock users data
    component.users = [
      { _id: '123', username: 'user1', email: 'user1@example.com', role: 'admin' },
      { _id: '456', username: 'user2', email: 'user2@example.com', role: 'user' }
    ];
    fixture.detectChanges(); // Trigger change detection

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2); // Check if two rows are rendered

    const firstRowCells = rows[0].queryAll(By.css('td'));
    expect(firstRowCells[0].nativeElement.textContent).toContain('user1');
    expect(firstRowCells[1].nativeElement.textContent).toContain('user1@example.com');
    expect(firstRowCells[2].nativeElement.textContent).toContain('admin');

    const secondRowCells = rows[1].queryAll(By.css('td'));
    expect(secondRowCells[0].nativeElement.textContent).toContain('user2');
    expect(secondRowCells[1].nativeElement.textContent).toContain('user2@example.com');
    expect(secondRowCells[2].nativeElement.textContent).toContain('user');
  });
});