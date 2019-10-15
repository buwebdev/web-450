import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div fxLayout="column" style="margin-top: 5%; margin-left: 10%; width: 60%;">
        <mat-card class="mat-elevation-z8">
            <mat-card-title>Primeng Carousel Example</mat-card-title>
            <mat-card-content>
                <p-carousel [value]="composers" numVisible="1">
                    <ng-template style="text-align: center;" let-item pTemplate="item">
                        <br /><br />
                        <div fxLayout="column" fxLayoutAlign="center center">
                            <div fxFlex>
                                <img src="./assets/composers/{{item.image}}">
                            </div>
                            <div fxFlex>
                                <p>{{item.name}}</p>
                            </div>
                        </div><br /><br />
                    </ng-template>
                </p-carousel>
            </mat-card-content>
            <mat-card-actions>
                <small>Images taken from <a href="https://historylists.org/people/top-10-most-famous-classical-music-composers.html" target="_blank">https://historylists.org/people/top-10-most-famous-classical-music-composers.html</a></small>
            </mat-card-actions>
        </mat-card>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Primeng Carousel Example';
  composers: any;

  constructor() {
    this.composers = [
      {name: 'Johann Sebastian Bach', image: 'johann-sebastian-bach.jpg'},
      {name: 'Wolfgang Amadeus Mozart', image: 'wolfgang-amadeus-mozart.jpg'},
      {name: 'Ludwig van Beethoven', image: 'ludwig-van-beethoven.jpg'},
      {name: 'Giuseppe Verdi', image: 'giuseppe-verdi.jpg'},
      {name: 'Frederic Chopin', image: 'frederic-chopin.jpg'},
      {name: 'Antonio Vivaldi', image: 'antonio-vivaldi.jpg'},
    ];
  }

  ngOnInit() {
  }


}
