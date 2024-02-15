/**
 * Author: Professor Krasso
 * Date: 2/15/2024
 * File Name: app-routing.module.ts
 * Description: Routing module for the application
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatureListComponent } from './creature/creature-list/creature-list.component';
import { CreatureNewComponent } from './creature/creature-new/creature-new.component';
import { CreatureDetailsComponent } from './creature/creature-details/creature-details.component';

// define the routes for the application and the components they map to.
const routes: Routes = [
  { path: '', component: CreatureListComponent, title: 'Hogwarts Creatures' },
  { path: 'creatures/new', component: CreatureNewComponent, title: 'Add a Creature'},
  { path: 'creatures/:id', component: CreatureDetailsComponent, title: 'Creature Details'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
