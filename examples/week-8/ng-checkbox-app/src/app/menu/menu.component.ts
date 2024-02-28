/**
 * Title: menu.component.ts
 * Author: Professor Krasso
 * Date: 9/27/23
 */

// import statements
import { Component } from '@angular/core';
import { Product } from './product';
import { MenuService } from './menu.service';
import { Order } from './order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  products: Array<Product> // products array of Product objects
  order: Order // order object of Order class

  constructor (private menuService: MenuService, private router: Router) {
    this.products = this.menuService.getProducts() // call MenuService's getProducts method to populate products array
    this.order = new Order() // instantiate new Order object

    console.log('Product Listing:', this.products) // log products array to the console
  }

  /**
   * @description generates a new order and logs it to the console
   */
  generateOrder() {
    console.log('Order', this.order) // log order to the console
    console.log('Products', this.products) // log products array to the console

    // loop over products array and add checked products to order object
    for (let product of this.products) {
      // check if product is checked (true)
      if (product.checked) {
        this.order.menuItems.push(product) // add product to order
      } // end if
    } // end for

    console.log('Ordered Items:', this.order.menuItems) // log ordered items to the console

    console.log('Order Tip:', this.order.tip) // log order tip to the console

    console.log('Order Total:', this.order.getOrderTotal()) // log order total to the console

    this.order.orderTotal = parseFloat(this.order.getOrderTotal()) // set orderTotal to the order's total

    console.log('Order', this.order) // log order to the console

    this.router.navigate(['/order-summary'], { queryParams: { order: JSON.stringify(this.order) }}) // navigate to order summary page and pass order object as query parameter
  }
}
