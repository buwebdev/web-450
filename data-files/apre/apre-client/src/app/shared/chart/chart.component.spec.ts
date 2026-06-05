import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { Chart, registerables } from 'chart.js';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    Chart.register(...registerables); // Register chart.js components

    await TestBed.configureTestingModule({
      imports: [ChartComponent] // Import ChartComponent
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;

    // Initialize or mock the inputs
    component.type = 'bar';
    component.label = 'Test Chart';
    component.data = [10, 20, 30, 40, 50, 60];
    component.labels = ['January', 'February', 'March', 'April', 'May', 'June'];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a chart with the correct type and data', () => {
    const chartInstance = component['chart'];
    expect(chartInstance).toBeTruthy(); // Ensure chartInstance is created
    expect(chartInstance.config.data.labels).toEqual(['January', 'February', 'March', 'April', 'May', 'June']);
    expect(chartInstance.config.data.datasets[0].data).toEqual([10, 20, 30, 40, 50, 60]);
    expect(chartInstance.config.data.datasets[0].label).toBe('Test Chart');
  });

  it('should update the chart when inputs change', () => {
    component.data = [15, 25, 35, 45, 55, 65];
    component.labels = ['July', 'August', 'September', 'October', 'November', 'December'];
    component.label = 'Updated Chart';
    component.ngOnChanges({
      data: { currentValue: component.data, previousValue: [10, 20, 30, 40, 50, 60], firstChange: false, isFirstChange: () => false },
      labels: { currentValue: component.labels, previousValue: ['January', 'February', 'March', 'April', 'May', 'June'], firstChange: false, isFirstChange: () => false },
      label: { currentValue: component.label, previousValue: 'Test Chart', firstChange: false, isFirstChange: () => false }
    });
    fixture.detectChanges();

    const chartInstance = component['chart'];
    expect(chartInstance.config.data.labels).toEqual(['July', 'August', 'September', 'October', 'November', 'December']);
    expect(chartInstance.config.data.datasets[0].data).toEqual([15, 25, 35, 45, 55, 65]);
    expect(chartInstance.config.data.datasets[0].label).toBe('Updated Chart');
  });

  it('should have a canvas element for the chart', () => {
    const compiled = fixture.nativeElement;
    const canvasElement = compiled.querySelector('canvas');
    expect(canvasElement).toBeTruthy();
  });
});