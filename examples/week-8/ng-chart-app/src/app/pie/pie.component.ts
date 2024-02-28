/**
 * Title: Pie Chart
 * Author: Professor Krasso
 * Date: 9/25/2023
 */
import { Component, OnInit } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  constructor () {}

  ngOnInit(): void {
    // Create a new pie chart instance via the myPie variable and the Chart constructor.
    // Pass in the id of the canvas element and the type of chart (pie).
    // Pass in the data and options objects to the chart constructor.
    const myPie = new Chart("myPieChart", {
      type: 'pie',
      data: {
          labels: ['Password Reset', 'Spyware Removal', 'RAM Upgrade', 'Software Installation', 'PC Tune-up', 'Keyboard Cleaning', 'Disk Clean-up'], // Labels for the data
          datasets: [{
              data: [12, 19, 3, 5, 2, 3, 30], // Data for the dataset
              backgroundColor: [
                '#ED0A3F',
                '#FF8833',
                '#5FA777',
                '#0066CC',
                '#6B3FA0',
                '#AF593E',
                '#6CDAE7'
              ],
              hoverBackgroundColor: [
                '#ED0A3F',
                '#FF8833',
                '#5FA777',
                '#0066CC',
                '#6B3FA0',
                '#AF593E',
                '#6CDAE7'
              ],
          }]
      }
    })
  }
}
