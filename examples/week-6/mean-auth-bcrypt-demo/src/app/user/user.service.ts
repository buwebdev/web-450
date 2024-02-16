/**
 * Author: Professor Krasso
 * Date: 2/16/2024
 * File Name: user.service.ts
 * Description: User service
 */

// Import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  /**
   * @description This function sends a POST request to the server to register a new user
   * @param user The user object
   * @returns The result of the POST request
   */
  register(user: User) {
    return this.http.post('/api/users/register', {
      email: user.email,
      password: user.password
    })
  }

  /**
   * @description This function sends a POST request to the server to login a user
   * @param user The user object
   * @returns The result of the POST request
   */
  login(user: User) {
    return this.http.post('/api/users/login', {
      email: user.email,
      password: user.password
    })
  }
}
