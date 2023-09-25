/**
 * Title: App Routing Module
 * Author: Professor Krasso
 * Date: 9/25/2023
 */

// Import statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PieComponent } from './pie/pie.component';
import { BarComponent } from './bar/bar.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';

// Routes array with path, component, and title properties for each route
// The title property is used to set the page title in the base-layout.component.html file
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Chart App - Home',
      },
      {
        path: 'bar',
        component: BarComponent,
        title: 'Chart App - Bar Chart'
      },
      {
        path: 'pie',
        component: PieComponent,
        title: 'Chart App - Pie Chart'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
