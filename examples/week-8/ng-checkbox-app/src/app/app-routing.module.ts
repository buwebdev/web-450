/**
 * Title: app-routing.module.ts
 * Author: Professor Krasso
 * Date: 9/27/23
 */

// import statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

// define routes array of Route objects with path and component properties
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: MenuComponent,
        title: 'Menu'
      },
      {
        path: 'order-summary',
        component: OrderSummaryComponent,
        title: 'Order Summary'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
