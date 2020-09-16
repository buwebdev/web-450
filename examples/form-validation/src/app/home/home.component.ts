import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
