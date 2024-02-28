/**
 * Title: order-summary.component.ts
 * Author: Professor Krasso
 * Date: 9/27/23
 */

// import statements
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../menu/order';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  order: Order // order object of Order class

  constructor (private route: ActivatedRoute, private router: Router) {
    this.order = {} as Order // instantiate new Order object

    const orderQueryParam = this.route.snapshot.queryParamMap.get('order'); // get order query parameter

    // if the order query parameter is not null, parse it into an Order object
    if (orderQueryParam !== null) {
      this.order = JSON.parse(orderQueryParam); // get order object from query parameter and parse it into an Order object
    } else {
      this.order = {} as Order; // instantiate new Order object
    }

    // if the order menuItems array is empty, navigate to the menu
    if (!this.order.menuItems || this.order.menuItems.length === 0) {
      this.router.navigate(['/']) // navigate to menu
    } // end if

    console.log('Order Summary:', this.order) // log order to the console
    console.log('Order Total:', this.order.orderTotal) // log order total to the console
  }
}
