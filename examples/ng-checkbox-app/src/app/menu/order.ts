/**
 * Title: order.ts
 * Author: Professor Krasso
 * Date: 9/27/23
 */

// import statement
import { Product } from './product';

export class Order {
  menuItems: Array<Product> // menuItems array of Product objects
  id: number // orderId
  date: string // date
  tip: number // tip
  tax: number // tax
  orderTotal: number // orderTotal

  // constructor
  constructor() {
    this.menuItems = [] // initialize menuItems array
    this.tip = 0 // initialize tip
    this.orderTotal = 0 // initialize orderTotal

    // generate random order number between 10000 and 99999
    this.id = Math.floor(Math.random() * 90000) + 10000

    // get current date
    this.date = new Date().toLocaleDateString()

    this.tax = 0.055 // initialize tax
  }

  /**
   * @description returns the total amount owed for the order including tip and tax
   * @returns Order total
   */
  getOrderTotal () {
    let total = 0 // initialize total variable

    for (let product of this.menuItems) {
      total += product.price // add product price to total
    }

    console.log('Menu Items Total: ', total) // log subtotal to the console

    total = total + parseFloat(this.tip.toString()) // add tip to total

    console.log('Total after tip:', total) // log total after tip to the console

    total += (total * this.tax) // add tax to total

    console.log('Total:', total) // log total to the console

    return total.toFixed(2) // return total
  } // end getOrderTotal function
}