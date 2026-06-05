import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-container">
      <h2 class="table__title">{{ title }}</h2>
      <table class="table">
        <thead class="table__head" [ngClass]="headerBackground">
          <tr class="table__row">
            @for(header of headers; track header) {
              <th class="table__header" (click)="sortableColumns.includes(header) && sortData(header)">
                <span class="header-content">
                  {{ header }}
                  <i class="fa" [ngClass]="sortedColumn === header ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'"></i>
                </span>
              </th>
            }
          </tr>
        </thead>
        <tbody class="table__body">
          @for(row of paginatedData; track row) {
            <tr class="table__row">
              @for(header of headers; track header) {
                <td class="table__cell">{{ row[header] }}</td>
              }
            </tr>
          }
        </tbody>
      </table>
      <div class="pagination">
        <button class="button button--primary" (click)="changePage(currentPage - 1)" [disabled]="currentPage === 1">Previous</button>
        <span class="pagination__info">Page {{ currentPage }}</span>
        <button class="button button--primary" (click)="changePage(currentPage + 1)" [disabled]="currentPage * recordsPerPage >= data.length">Next</button>
      </div>
    </div>
  `,
  styles: `
    .table-container {
      width: 100%;
      margin: 0 auto;
    }

    .table__title {
      margin-bottom: 20px;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin: 20px 0;
    }

    .table__head {
      background-color: #f8f9fa; /* Default background color */
    }

    .table__head.primary {
      background-color: #20c997; /* Primary background color */
      color: white;
    }

    .table__head.secondary {
      background-color: #4e4a4a; /* Secondary background color */
      color: white;
    }

    .table__row {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }

    .table__header, .table__cell {
      padding: 10px;
      text-align: left;
      position: relative;
    }

    .table__header {
      font-weight: bold;
      cursor: pointer;
    }

    .header-content {
      display: inline-flex;
      align-items: center;
    }

    .header-content i {
      margin-left: 5px;
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    .pagination__info {
      align-self: center;
    }
  `
})
export class TableComponent implements OnInit, OnChanges {
  @Input() title!: string;
  @Input() data!: any[];
  @Input() headers!: string[];
  @Input() recordsPerPage: number = 10;
  @Input() sortableColumns!: string[];
  @Input() headerBackground: 'default' | 'primary' | 'secondary' = 'default';

  currentPage: number = 1;
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.sortData(this.sortedColumn);
    }
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.recordsPerPage;
    const end = start + this.recordsPerPage;
    return this.data.slice(start, end);
  }

  sortData(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.data.sort((a, b) => {
      if (a[column] < b[column]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}