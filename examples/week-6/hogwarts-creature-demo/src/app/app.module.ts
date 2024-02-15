/**
 * Author: Professor Krasso
 * Date: 2/15/2024
 * File Name: app.module.ts
 * Description: The app module
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatureListComponent } from './creature/creature-list/creature-list.component';
import { CreatureNewComponent } from './creature/creature-new/creature-new.component';
import { CreatureDetailsComponent } from './creature/creature-details/creature-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreatureListComponent,
    CreatureNewComponent,
    CreatureDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
