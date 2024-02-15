/**
 * Author: Professor Krasso
 * Date: 2/15/2024
 * File Name: creature-new.component.ts
 * Description: New creature component; creates a new creature and adds it to the database.
 */

// import the necessary modules
import { Component } from '@angular/core';
import { Creature } from '../creature.interface';
import { CreatureService } from '../creature.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creature-new',
  templateUrl: './creature-new.component.html',
  styleUrl: './creature-new.component.css'
})
export class CreatureNewComponent {
  // add a property to hold the creature
  creature: Creature;

  // add a property to hold the abilities as a string
  abilitiesString: string;

  constructor(private creatureService: CreatureService, private router: Router) {
    this.creature = {} as Creature; // create an empty creature object
    this.abilitiesString = ''; // initialize the abilities string
  }

  /**
   * Create a new creature
   */
  createCreature() {
    console.log(this.creature);

    this.creature.abilities = this.abilitiesString.split(','); // Convert the abilities string to an array
    this.creature.abilities = this.creature.abilities.map(ability => ability.trim()); // Trim whitespace from each ability

    // create the creature using the creature service
    this.creatureService.createCreature(this.creature).subscribe({
      next: (creature) => {
        console.log('created creature:', creature); // log the created creature to the console
        this.router.navigate(['/']); // navigate to the creatures route
      },
      // log any errors to the console
      error: (err) => {
        console.error('error:', err); // log the error to the console
      }
    });
  }
}
