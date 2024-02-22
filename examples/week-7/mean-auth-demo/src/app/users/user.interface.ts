/**
 * Author: Professor Krasso
 * Date: 2/21/2021
 * File Name: user.interface.ts
 * Description: User interface
 */

// selected security question interface with question and answer
export interface SelectedSecurityQuestion {
  question: string;
  answer: string;
}

// user interface with email, password, first name, last name, and selected security questions
export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  selectedSecurityQuestions: SelectedSecurityQuestion[];
}
