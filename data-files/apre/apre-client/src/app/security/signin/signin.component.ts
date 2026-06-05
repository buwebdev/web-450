import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="signin">
      <h1 class="signin__title">Sign In</h1>

      @if(errorMessage) {
        <div class="message message--error">{{ errorMessage }}</div>
      }

      <form [formGroup]="signinForm" (ngSubmit)="signin();" class="signin__form">
        <div class="signin__form-group">
          <label for="username" class="signin__label">Username</label>
          <input id="username" formControlName="username" type="text" class="signin__input" />
        </div>
        <div class="signin__form-group">
          <label for="password" class="signin__label">Password</label>
          <input id="password" formControlName="password" type="password" class="signin__input" />
        </div>
        <input type="submit" class="signin__button" Value="Submit" />
      </form>
      <a href="/" class="signin__return-link">Return to Home</a>
    </div>
  `,
  styles: `
    .signin {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 30%;
      margin: 50px auto; /* Center the card */
      border: 1px solid #ddd; /* Add border */
      font-family: 'Roboto', sans-serif;
    }

    .signin__title {
      text-align: center;
    }

    .signin__form {
      display: flex;
      flex-direction: column;
    }

    .signin__form-group {
      margin-bottom: 15px;
    }

    .signin__label {
      margin-bottom: 5px;
    }

    .signin__input {
      padding: 8px;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #ccc; /* Default border color */
      border-radius: 4px;
    }

    .signin__input:focus {
      border-color: #20c997; /* Green border on focus */
      outline: none; /* Remove default outline */
    }

    .signin__button {
      padding: 10px;
      background-color: #20c997;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .signin__button:hover {
      background-color: #17a589;
    }

    .signin__return-link {
      display: block;
      text-align: center;
      margin-top: 15px;
      color: #20c997;
      text-decoration: none;
    }

    .signin__return-link:hover {
      text-decoration: underline;
    }
  `
})
export class SigninComponent {
  errorMessage: string;

  signinForm: FormGroup = this.fb.group({
    username: [null, Validators.compose([Validators.required])],
    password: [null, Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')])],
  });

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService) {
    this.errorMessage = '';
  }

  signin() {
    const username = this.signinForm.controls['username'].value;
    const password = this.signinForm.controls['password'].value;

    if (!this.signinForm.valid) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.http.post(`${environment.apiBaseUrl}/security/signin`, { username, password }).subscribe({
      next: (response: any) => {
        console.log('Signin Response', response);

        const sessionUser = {
          username: response.username,
          role: response.role,
        }

        this.cookieService.set('sessionUser', JSON.stringify(sessionUser));

        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Signin Error', error);
        this.errorMessage = 'Invalid username or password'
      }
    });
  }
}
