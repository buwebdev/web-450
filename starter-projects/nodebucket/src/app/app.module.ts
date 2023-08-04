import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthLayoutComponent,
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
