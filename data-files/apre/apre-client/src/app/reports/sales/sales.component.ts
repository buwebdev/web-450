/**
 * Author: Professor Krasso
 * Date: 10 September 2024
 * File: sales.component.ts
 * Description: Sales component
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet />`,
  styles: ``
})
export class SalesComponent {

}
