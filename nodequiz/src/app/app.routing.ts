import {Routes} from '@angular/router';
import {BaseLayoutComponent} from './shared';

export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      /*
        New components go here...
       */
    ]
  }
];
