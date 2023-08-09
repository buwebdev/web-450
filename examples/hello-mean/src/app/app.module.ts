/**
 * Title: app.module.ts
 * Author: Professor Krasso
 * Date: 8/9/2021
 */

// Import statements
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
