/**
 * Author: Professor Krasso
 * Date: 2/15/2024
 * File Name: creature-list.component.ts
 * Description: The creature list component
 */

// import the core angular module
import { Component } from '@angular/core';
import { CreatureService } from '../creature.service';
import { Creature } from '../creature.interface';

@Component({
  selector: 'app-creature-list',
  templateUrl: './creature-list.component.html',
  styleUrl: './creature-list.component.css'
})
export class CreatureListComponent {
  creatures: Creature[]; // create a property to hold the creatures

  // create an instance of the creature service
  constructor(private creatureService: CreatureService) {
    this.creatures = []; // initialize the creatures array

    // call the creature service to get the creatures
    this.creatureService.getCreatures().subscribe({
      next: (creatures) => {
        this.creatures = creatures; // assign the creatures to the creatures array
      },
      error: (err) => { // log any errors to the console
        console.error('error:', err);
      },
      // log the creatures to the console
      complete: () => {
        console.log('creatures:', this.creatures)
      }
    });
  }

  // create a method to delete a creature
  deleteCreature(id: string | undefined) {

    // check if the id is defined
    if (id !== undefined) {

      // confirm the user wants to delete the creature
      if (!confirm('Are you sure you want to delete this creature?')) {
        return; // if the user cancels, return
      }

      console.log('Deleting creature:', id); // log the creature id to the console

      // call the creature service to delete the creature
      this.creatureService.deleteCreature(id).subscribe({
        next: (result) => {
          console.log('result:', result); // log the result to the console
          this.creatures = this.creatures.filter((creature) => creature._id !== id); // remove the creature from the creatures array
        },
        error: (err) => {
          console.error('error:', err); // log any errors to the console
        }
      });
    } else {
      console.error('Creature ID is undefined'); // log an error to the console
    }
  }
}
