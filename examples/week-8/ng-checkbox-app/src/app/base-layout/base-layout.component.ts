/**
 * Title: base-layout.component.ts
 * Author: Professor Krasso
 * Date: 9/27/23
 */

// import statements
import { Component } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent {
  year: string = new Date().getFullYear().toString(); // year string variable with current year value
}
