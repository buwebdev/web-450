import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment} from '../../../../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div>
      <h1>User Details</h1>
      @if (errorMessage) {
        <div class="message message--error">{{ errorMessage }}</div>
      }
      <form [formGroup]="userDetailsForm" (ngSubmit)="editUser();" class="form">
        <div class="form__group">
          <label class="label" for="username">Username<span class="required">*</span></label>
          <input class="input" type="text" formControlName="username" id="username" name="username">

          @if (userDetailsForm.controls['username'].touched && userDetailsForm.controls['username'].hasError('required')) {
            <small class="message message--error">Username is required.</small>
          }
        </div>

        <div class="form__group">
          <label class="label" for="email">Email<span class="required">*</span></label>
          <input class="input" type="text" formControlName="email" id="email" name="email">
        </div>

        <div class="form__group">
          <label class="label" for="role">Role<span class="required">*</span></label>
          <select class="select" formControlName="role" id="role" name="role">
            <option value="admin">Admin</option>
            <option value="supervisor">Supervisor</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        <div class="form__actions">
          <input type="submit" class="button button--primary" value="Submit">
        </div>
      </form>
      <br />
      <a class="link link--secondary" routerLink="/user-management/users">Return</a>
    </div>
  `,
  styles: ``
})
export class UserDetailsComponent {
  _id: string;
  user: User;
  errorMessage: string;

  userDetailsForm: FormGroup = this.fb.group({
    username: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    role: [null, Validators.required],
  });

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this._id = this.route.snapshot.paramMap.get('id') || '';
    this.errorMessage = '';
    this.user = {} as User;

    if (this._id === '') {
      this.router.navigate(['/user-management/users']);
    }

    this.http.get(`${environment.apiBaseUrl}/users/${this._id}`).subscribe({
      next: (user) => {
        this.user = user as User;
        console.log('User', user);
      },
      complete: () => {
        this.userDetailsForm.patchValue({
          username: this.user.username,
          email: this.user.email,
          role: this.user.role
        });
      }
    });
  }

  editUser() {
    if (this.userDetailsForm.valid) {
      const username = this.userDetailsForm.controls['username'].value;
      const email = this.userDetailsForm.controls['email'].value;
      const role = this.userDetailsForm.controls['role'].value;

      console.log(`Editing user ${this._id} with username ${username}, email ${email}, and role ${role}`);

      this.http.put(`${environment.apiBaseUrl}/users/${this._id}`, { username, email, role }).subscribe({
        next: () => {
          this.router.navigate(['/user-management/users']);
        },
        error: (error) => {
          console.log('Error', error);
          this.errorMessage = error.message;
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
