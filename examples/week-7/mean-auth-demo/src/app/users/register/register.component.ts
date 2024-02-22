/**
 * Author: Professor Krasso
 * Date: 2/21/2021
 * File Name: register.component.ts
 * Description: Register component
 */

// import statements
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // variables for the register component
  securityQuestions: string[]
  qArr1: string[]
  qArr2: string[]
  qArr3: string[]

  user: User; // user object to store the form data
  errorMessage: string; // error message to display to the user

   // register form group with form builder and validators
   registerForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])],
    question1: [null, Validators.compose([Validators.required])],
    answer1: [null, Validators.compose([Validators.required])],
    question2: [null, Validators.compose([Validators.required])],
    answer2: [null, Validators.compose([Validators.required])],
    question3: [null, Validators.compose([Validators.required])],
    answer3: [null, Validators.compose([Validators.required])]
  })

  constructor (private router: Router, private fb: FormBuilder, private userService: UserService) {
    // Array of security questions
    this.securityQuestions = [
      "What is your mother's maiden name?",
      "What is the name of your first pet?",
      "What is your favorite color?",
      "What is your favorite movie?",
      "What is your favorite food?",
      "What is your favorite song?"
    ]

    this.qArr1 = this.securityQuestions // initialize the first array of questions to the security questions array
    this.qArr2 = [] // initialize the second array of questions to an empty array
    this.qArr3 = [] // initialize the third array of questions to an empty array

    this.user = {} as User // initialize the user to an empty object
    this.errorMessage = '' // initialize the error message to an empty string
  }

  ngOnInit(): void {
    // subscribe to the value changes of question 1
    this.registerForm.get('question1')?.valueChanges.subscribe(val => {
      console.log('Value changed from question 1', val)
      this.qArr2 = this.qArr1.filter(q => q !== val) // filter the first array of questions to remove the selected question
    })

    // subscribe to the value changes of question 2
    this.registerForm.get('question2')?.valueChanges.subscribe(val => {
      console.log('Value changed from question 2', val)
      this.qArr3 = this.qArr2.filter(q => q !== val) // filter the second array of questions to remove the selected question
    })
  }

  // register function that takes in no parameters and returns nothing
  // this function registers a new user and navigates to the homepage page
  register() {
    // set the user object to the values of the register form
    this.user = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      selectedSecurityQuestions: [
        {
          question: this.registerForm.get('question1')?.value,
          answer: this.registerForm.get('answer1')?.value
        },
        {
          question: this.registerForm.get('question2')?.value,
          answer: this.registerForm.get('answer2')?.value
        },
        {
          question: this.registerForm.get('question3')?.value,
          answer: this.registerForm.get('answer3')?.value
        }
      ]
    }

    console.log('Registering new user', this.user) // log the employee object to the console

    // call the register function from the security service and subscribe to the result
    this.userService.registerUser(this.user).subscribe({
      next: (result) => {
        console.log('Result from Register API call: ', result) // log the result to the console
        this.router.navigate(['/']) // navigate to the signin page
      },
      error: (err) => {
        if (err.error.message) {
          console.log('db error: ', err.error.message) // log the error message to the console
          this.errorMessage = err.error.message // set the error message to the error message from the API
        } else {
          this.errorMessage = 'Something went wrong. Please contact the system administrator.'
          console.log(err)
        }
      }
    })
  }
}
