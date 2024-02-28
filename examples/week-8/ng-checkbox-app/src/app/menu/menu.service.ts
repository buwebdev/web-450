/**
 * Title: menu.service.ts
 * Author: Professor Krasso
 * Date: 9/27/23
 */

// `MenuService` class with `getProducts` method
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
// MenuService class with getProduct method that returns array of Product objects
export class MenuService {

  products: Array<Product>; // `products` array of `Product` objects

  constructor() {
    // initialize products array with Product objects
    this.products = [
      {
        id: 100,
        name: 'Plain Egg',
        price: 1.99,
        checked: false
      },
      {
        id: 101,
        name: 'Bacon and Egg',
        price: 2.99,
        checked: false
      },
      {
        id: 102,
        name: 'Bagel and Cream Cheese',
        price: 2.99,
        checked: false
      },
      {
        id: 103,
        name: 'Breakfast Sandwich',
        price: 2.99,
        checked: false
      },
      {
        id: 104,
        name: 'Egg and Cheese on Toast',
        price: 2.99,
        checked: false
      },
      {
        id: 105,
        name: 'French Toast',
        price: 2.99,
        checked: false
      },
      {
        id: 106,
        name: 'Fruit Basket',
        price: 2.99,
        checked: false
      }
    ] // end products array
  } // end constructor

  /**
   * @description returns array of Product objects from MenuService class
   * @returns Array<Product>
   */
  getProducts(): Array<Product> {
    return this.products; // return products array of Product objects
  } // end getProduct method
}
