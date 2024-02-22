/**
 * Author: Professor Krasso
 * Date: 2/21/2021
 * File Name: verify-security-questions.component.ts
 * Description: Verify security questions component
 */

// import statements
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectedSecurityQuestion } from '../user.interface';

@Component({
  selector: 'app-verify-security-questions',
  templateUrl: './verify-security-questions.component.html',
  styleUrl: './verify-security-questions.component.css'
})
export class VerifySecurityQuestionsComponent {
  selectedSecurityQuestions: SelectedSecurityQuestion[] // security questions view model array
  email: string // user email address
  errorMessage: string // error message
  isLoadingLabels: boolean // loading boolean
  isLoadingSubmit: boolean // loading boolean
  question1: string // question 1
  question2: string // question 2
  question3: string // question 3

  // Angular form group for the security questions form
  sqForm: FormGroup = this.fb.group({
    answer1: [null, Validators.compose([Validators.required])],
    answer2: [null, Validators.compose([Validators.required])],
    answer3: [null, Validators.compose([Validators.required])]
  }) // end sqForm

  constructor (private route: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder) {
    this.selectedSecurityQuestions = [] // initialize the selectedSecurityQuestions array
    this.question1 = '' // initialize the question1 variable
    this.question2 = '' // initialize the question2 variable
    this.question3 = '' // initialize the question3 variable
    this.errorMessage = '' // initialize the errorMessage variable
    this.isLoadingLabels = true // initialize the isLoading variable
    this.isLoadingSubmit = false // initialize the isLoading variable
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '' // get the email address from the query string
    console.log('Email Address:', this.email)

    // if no email address is found, redirect to the forgot password page
    if (!this.email) {
      this.router.navigate(['/forgot-password']) // redirect to the forgot password page
      return // return to prevent further execution
    } // end if

    this.userService.getSecurityQuestions(this.email).subscribe({
      next: (data: any) => {
        console.log("Data from getSecurityQuestions Call:", data)
        this.selectedSecurityQuestions = data // assign the data to the selectedSecurityQuestions array
        console.log('Employees selected security questions', this.selectedSecurityQuestions)
      },
      // if there is an error, log the error to the console
      error: (err) => {
        console.log('Server Error from findSelectedSecurityQuestions Call:', err)

        // if the error status is 404, the email address was not found
        if (err.status === 404) {
          this.errorMessage = 'The email address you entered was not found.'
          return
        } else {
          // if the error status is not 404, there was a server error
          this.errorMessage = 'There was a problem verifying your security questions.  Please try again.'
        } // end if

        this.isLoadingLabels = false // set the isLoading variable to false
      },
      // once the observable is complete, assign the questions to the question variables
      complete: () => {
        this.question1 = this.selectedSecurityQuestions[0].question // assign the first question to the question1 variable
        this.question2 = this.selectedSecurityQuestions[1].question // assign the second question to the question2 variable
        this.question3 = this.selectedSecurityQuestions[2].question // assign the third question to the question3 variable

        this.isLoadingLabels = false // set the isLoading variable to false
      } // end complete
    }) // end subscribe
  }

  // verifySecurityQuestions function that takes in no parameters and returns nothing
  verifySecurityQuestions () {
    this.isLoadingSubmit = true // set the isLoading variable to true
    console.log(this.sqForm.value)

    // local security questions array with the questions and answers from the form
    let securityQuestions = [
      {
        question: this.question1,
        answer: this.sqForm.controls['answer1'].value
      },
      {
        question: this.question2,
        answer: this.sqForm.controls['answer2'].value
      },
      {
        question: this.question3,
        answer: this.sqForm.controls['answer3'].value
      }
    ] // end securityQuestions

    console.log('Employee provided security questions', securityQuestions)

    // call the security service verifySecurityQuestions function with the email address and security questions array
    this.userService.verifySecurityQuestions(this.email, securityQuestions).subscribe({
      // if the observable is successful, navigate to the reset password page
      next: (res) => {
        console.log('Response from verifySecurityQuestions Call:', res)
        this.router.navigate(['/reset-password'], { queryParams: { email: this.email }, skipLocationChange: true })
      },
      // if there is an error, log the error to the console
      error: (err) => {
        if (err.error.message) {
          this.errorMessage = err.error.message
          console.error('Server Error from verifySecurityQuestions Call:', err.error.message)
          return
        } else {
          console.error('Server Error from verifySecurityQuestions Call:', err)
          this.errorMessage = 'There was a problem verifying your security questions.  Please try again.'
          this.isLoadingSubmit = false // set the isLoading variable to false
        } // end else
      },
      complete: () => {
        this.isLoadingSubmit = false // set the isLoading variable to false
      }
    })
  }
}
