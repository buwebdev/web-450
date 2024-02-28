/**
 * TItle: app.module.ts
 * Author: Professor Krasso
 * Date: 9/25/2023
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PieComponent } from './pie/pie.component';
import { BarComponent } from './bar/bar.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PieComponent,
    BarComponent,
    BaseLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
