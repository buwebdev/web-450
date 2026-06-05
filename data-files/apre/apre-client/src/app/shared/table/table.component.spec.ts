import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent] // Import the standalone component
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.data = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]; // Provide mock data
    component.headers = ['id', 'name']; // Provide mock headers
    component.sortableColumns = ['id', 'name']; // Provide sortable columns
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct table headers', () => {
    const compiled = fixture.nativeElement;
    const headerElements = compiled.querySelectorAll('.table__header');

    expect(headerElements.length).toBe(2);
    expect(headerElements[0].textContent.trim()).toBe('id');
    expect(headerElements[1].textContent.trim()).toBe('name');
  });

  it('should display the correct table data', () => {
    const compiled = fixture.nativeElement;
    const rowElements = compiled.querySelectorAll('.table__body .table__row');

    expect(rowElements.length).toBe(2);
    expect(rowElements[0].querySelectorAll('.table__cell')[0].textContent.trim()).toBe('1');
    expect(rowElements[0].querySelectorAll('.table__cell')[1].textContent.trim()).toBe('Item 1');
    expect(rowElements[1].querySelectorAll('.table__cell')[0].textContent.trim()).toBe('2');
    expect(rowElements[1].querySelectorAll('.table__cell')[1].textContent.trim()).toBe('Item 2');
  });

  it('should sort the table data by column', () => {
    // Initial sort by 'name' in ascending order
    component.sortData('name');
    fixture.detectChanges();

    let compiled = fixture.nativeElement;
    let rowElements = compiled.querySelectorAll('.table__body .table__row');

    expect(rowElements[0].querySelectorAll('.table__cell')[1].textContent.trim()).toBe('Item 1');
    expect(rowElements[1].querySelectorAll('.table__cell')[1].textContent.trim()).toBe('Item 2');

    // Sort by 'name' in descending order
    component.sortData('name');
    fixture.detectChanges();

    compiled = fixture.nativeElement;
    rowElements = compiled.querySelectorAll('.table__body .table__row');

    expect(rowElements[0].querySelectorAll('.table__cell')[1].textContent.trim()).toBe('Item 2');
    expect(rowElements[1].querySelectorAll('.table__cell')[1].textContent.trim()).toBe('Item 1');
  });

  it('should change page when pagination buttons are clicked', () => {
    component.recordsPerPage = 1;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const nextButton = compiled.querySelector('.button--primary:last-child');
    const prevButton = compiled.querySelector('.button--primary:first-child');

    expect(component.currentPage).toBe(1);

    nextButton.click();
    fixture.detectChanges();
    expect(component.currentPage).toBe(2);

    prevButton.click();
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
  });
});