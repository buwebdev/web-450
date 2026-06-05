/**
 * Author: Professor Krasso
 * Date: 8/8/2024
 * File: app.config.ts
 * Description: Application configuration file
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient() // Import the HttpClient module from the Angular common HTTP library
  ]
};
