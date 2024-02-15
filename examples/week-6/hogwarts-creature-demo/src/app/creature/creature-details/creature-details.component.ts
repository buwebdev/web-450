/**
 * Author: Professor Krasso
 * Date: 2/15/2024
 * File Name: creature-details.component.ts
 * Description: The creature details component
 */

// import the necessary modules
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreatureService } from '../creature.service';
import { Creature } from '../creature.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creature-details',
  templateUrl: './creature-details.component.html',
  styleUrl: './creature-details.component.css'
})
export class CreatureDetailsComponent {
  id: string; // add a property to hold the id
  creature: Creature; // add a property to hold the creature
  abilitiesString: string; // add a property to hold the abilities as a string

  constructor(private route: ActivatedRoute, private creatureService: CreatureService, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id') || ''; // get the id from the route
    this.abilitiesString = ''; // initialize the abilities string

    console.log('id:', this.id); // log the id to the console

    this.creature = {} as Creature; // create an empty creature object

    // get the creature from the creature service
    this.creatureService.getCreature(this.id).subscribe({
      // when the creature is returned, set the creature property to the creature
      next: (creature) => {
        this.creature = creature;
        this.abilitiesString = this.creature.abilities.join(', '); // set the abilities string
      },
      // log any errors to the console
      error: (err) => {
        console.error('error:', err);
      },
      complete: () => { // log the creature to the console
        console.log('creature:', this.creature);
      }
    });
  }

  // update the creature
  updateCreature() {
    console.log(this.creature); // log the creature to the console

    // Convert the abilities string to an array
    this.creature.abilities = this.abilitiesString.split(',');

    // Trim whitespace from each ability
    this.creature.abilities = this.creature.abilities.map(ability => ability.trim());

    // update the creature using the creature service
    this.creatureService.updateCreature(this.creature).subscribe({
      // log the updated creature to the console
      next: (creature) => {
        console.log('updated creature:', creature);
        this.router.navigate(['/']); // navigate to the creatures route
      },
      // log any errors to the console
      error: (err) => {
        console.error('error:', err);
      }
    });
  }
}
