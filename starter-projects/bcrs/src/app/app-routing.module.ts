import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'BCRS: Home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
