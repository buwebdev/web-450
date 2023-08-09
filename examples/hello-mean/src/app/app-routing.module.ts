/**
 * Title: app-routing.module.ts
 * Author: Professor Krasso
 * Date: 8/9/2021
 */

// Import statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { IndexComponent } from './index/index.component';

// Define the routes for the application here.
const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'hello',
    component: HelloComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})], // Add the routes to the module imports array.
  exports: [RouterModule]
})
export class AppRoutingModule { }
