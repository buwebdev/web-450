/**
 * Author: Professor Krasso
 * Date: 8/8/2024
 * File: dashboard.component.spec.ts
 * Description: Test file for the dashboard component
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { environment } from '../../environments/environment';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        HttpClientTestingModule // Add HttpClientModule to the imports array
      ]
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadReports on initialization', () => {
    spyOn(component, 'loadReports');
    component.ngOnInit();
    expect(component.loadReports).toHaveBeenCalled();
  });

  it('should call loadSalesData when loadReports is called', () => {
    spyOn(component, 'loadSalesData');
    component.loadReports();
    expect(component.loadSalesData).toHaveBeenCalled();
  });

  it('should display data in the table when tableData is populated', () => {
    const mockAgentFeedbackData = [
      { agent: 'Agent 1', callDuration: '5 mins', customerFeedback: 'Positive' },
      { agent: 'Agent 2', callDuration: '10 mins', customerFeedback: 'Neutral' }
    ];

    // Simulate the loadAgentFeedbackData method
    component.tableData = mockAgentFeedbackData;
    fixture.detectChanges(); // Trigger change detection

    const tableRows = fixture.nativeElement.querySelectorAll('.dashboard__table-container .table tbody tr');
    expect(tableRows.length).toBe(2); // Check if there are two rows

    const firstRowCells = tableRows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent).toContain('Agent 1');
    expect(firstRowCells[1].textContent).toContain('5 mins');
    expect(firstRowCells[2].textContent).toContain('Positive');

    const secondRowCells = tableRows[1].querySelectorAll('td');
    expect(secondRowCells[0].textContent).toContain('Agent 2');
    expect(secondRowCells[1].textContent).toContain('10 mins');
    expect(secondRowCells[2].textContent).toContain('Neutral');
  });
});