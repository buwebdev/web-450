import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableComponent } from './../../../shared/table/table.component';

@Component({
  selector: 'app-sales-by-region-tabular',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule],
  template: `
    <h1>Sales by Region - Tabular</h1>
    <div class="region-container">
      <form class="form" [formGroup]="regionForm" (ngSubmit)="onSubmit()">
        <div class="form__group">
          <label class="label" for="region">Region</label>
          <select class="select" formControlName="region" id="region" name="region">
            @for(region of regions; track region) {
              <option value="{{ region }}">{{ region }}</option>
            }
          </select>
        </div>
        <div class="form__actions">
          <button class="button button--primary" type="submit">Submit</button>
        </div>
      </form>

      @if (salesData.length > 0) {
        <div class="card chart-card">
          <app-table
            [title]="'Sales by Region - Tabular'"
            [data]="salesData"
            [headers]="['Region', 'Sales Person', 'Total Sales']"
            [sortableColumns]="['Sales Person', 'Total Sales']"
            [headerBackground]="'secondary'"
            >
          </app-table>
        </div>
      }
    </div>
  `,
  styles: `
    .region-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .form, .chart-card {
      width: 50%;
      margin: 20px 0;
      padding: 10px;
    }

    app-table {
      padding: 50px;
    }
  `
})
export class SalesByRegionTabularComponent {
  salesData: any[] = [];
  regions: string[] = [];

  regionForm = this.fb.group({
    region: [null, Validators.compose([Validators.required])]
  });

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.http.get(`${environment.apiBaseUrl}/reports/sales/regions`).subscribe({
      next: (data: any) => {
        this.regions = data;
      },
      error: (err) => {
        console.error('Error fetching regions:', err);
      }
    });
  }

  onSubmit() {
    const region = this.regionForm.controls['region'].value;
    this.http.get(`${environment.apiBaseUrl}/reports/sales/regions/${region}`).subscribe({
      next: (data: any) => {
        this.salesData = data;
        for (let data of this.salesData) {
          data['Region'] = region;
          data['Total Sales'] = data['totalSales'];
          data['Sales Person'] = data['salesperson'];
        }

        console.log('Sales data:', this.salesData);
      },
      error: (err) => {
        console.error('Error fetching sales data:', err);
      }
    });
  }
}
