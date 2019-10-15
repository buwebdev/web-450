import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <div style="width: 50%; margin-top: 12%; margin-left: 20%;" fxLayout="column">
        <mat-card class="mat-elevation-z8">
            <mat-card-title>Angular Form Validation Example</mat-card-title>
            <mat-card-content>
                <form [formGroup]="form" (ngSubmit)="multiply(); form.reset();" #multiplyForm>
                    <mat-card style="width: 50%; margin: 0 auto;">
                        <mat-card-content fxLayout="column" fxLayoutGap="10px">
                            <!-- if the result message contains a value, display it --> 
                            <mat-card *ngIf="resultMessage">
                              <mat-card-title class="result-msg">{{resultMessage}}</mat-card-title>
                            </mat-card>
                            
                            <small *ngIf="form.controls['first'].hasError('required') && form.controls['first'].touched">First number is a required field</small>
                            <small *ngIf="form.controls['first'].hasError('pattern') && form.controls['first'].touched">First number must be an Integer value.</small>
                            <mat-form-field fxFlex>
                                <input type="text" matInput [formControl]="form.controls['first']" placeholder="First number" />
                            </mat-form-field>
                            
                            <small *ngIf="form.controls['first'].hasError('required') && form.controls['second'].touched">First number is a required field</small>
                            <small *ngIf="form.controls['first'].hasError('pattern') && form.controls['second'].touched">First number must be an Integer value.</small>
                            <mat-form-field fxFlex>
                                <input type="text" matInput [formControl]="form.controls['second']" placeholder="Second number" />
                            </mat-form-field>
                            
                        </mat-card-content>
                        <mat-card-actions>
                            <button fxFlex mat-raised-button color="primary" [disabled]="!form.valid" type="submit">Multiply Numbers</button>
                        </mat-card-actions>
                    </mat-card>
                </form>
                <br /><br />
            </mat-card-content>
        </mat-card> 
    </div>
  `,
  styles: [`
    small {
        color: red;
    }
    .result-msg {
        text-align: center;
        color: steelblue;
        font-weight: bold;
    }
  `]
})
export class AppComponent implements OnInit {
  resultMessage: string;
  resultValue: number;
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      first: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      second: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });
  }

  multiply() {
    const first = this.form.controls['first'].value;
    const second = this.form.controls['second'].value;

    this.resultValue = (parseInt(first, 10) * parseInt(second, 10));
    this.resultMessage = `${first} x ${second} = ${this.resultValue}`;
  }
}
