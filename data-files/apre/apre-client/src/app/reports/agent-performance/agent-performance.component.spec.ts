import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPerformanceComponent } from './agent-performance.component';

describe('AgentPerformanceComponent', () => {
  let component: AgentPerformanceComponent;
  let fixture: ComponentFixture<AgentPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentPerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
