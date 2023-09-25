/**
 * Title: Bar Chart
 * Author: Professor Krasso
 * Date: 9/25/2023
 */
import { Component, OnInit } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  constructor () { }

  ngOnInit() {
    // Create a new chart object with the id of myBarChart and type of bar chart
    // Pass in the data and options objects to the chart constructor
    // The data object contains the labels and datasets
    const myChart = new Chart("myBarChart", {
      type: 'bar',
      data: {
          labels: ['Apple', 'Orange', 'Banana', 'Grape', 'Plum', 'Blueberry'], // Labels for the data
          datasets: [{
              label: '# of fruits', // Label for the dataset
              data: [30, 15, 6, 36, 12, 48], // Data for the dataset
              backgroundColor: [
                  '#EF9A9A',
                  '#FFCC80',
                  '#FFF59D',
                  '#A5D6A7',
                  '#CE93D8',
                  '#9FA8DA'
              ],
              borderColor: [
                  '#E53935',
                  '#FB8C00',
                  '#FDD835',
                  '#43A047',
                  '#8E24AA',
                  '#3949AB'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });
  }
}
