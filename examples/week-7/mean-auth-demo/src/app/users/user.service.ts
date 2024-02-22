/**
 * Author: Professor Krasso
 * Date: 2/21/2021
 * File Name: user.service.ts
 * Description: This service is used to handle user registration, email verification, security question verification, and password reset.
 */

// import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.interface';
import { SelectedSecurityQuestion } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // constructor
  constructor(private http: HttpClient) { }

  /**
   * @description - This function is used to register a new user
   * @param user - user object
   * @returns - response from the API
   */
  registerUser(user: User) {
    return this.http.post('/api/users/register', user);
  }

  /**
   * @description - This function is used to verify the user's email
   * @param email - user email
   * @returns - response from the API
   */
  verifyEmail(email: string) {
    return this.http.get(`/api/users/verify-email/${email}`);
  }

  /**
   * @description - This function is used to verify the user's security questions
   * @param email - user email
   * @param securityQuestions - array of selected security questions
   * @returns - response from the API
   */
  verifySecurityQuestions(email: string, securityQuestions: SelectedSecurityQuestion[]) {
    return this.http.post(`/api/users/verify-security-questions/${email}`, { securityQuestions });
  }

  /**
   * @description - This function is used to reset the user's password
   * @param email - user email
   * @param password - user password
   * @returns - response from the API
   */
  resetPassword(email: string, password: string) {
    return this.http.post(`/api/users/reset-password/${email}`, { password });
  }

  /**
   * @description - This function is used to get the user's security questions
   * @param email - user email
   * @returns - response from the API
   */
  getSecurityQuestions(email: string) {
    return this.http.get(`/api/users/security-questions/${email}`);
  }
}
