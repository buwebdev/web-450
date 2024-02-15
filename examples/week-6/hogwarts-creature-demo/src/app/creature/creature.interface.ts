/**
 * Author: Professor Krasso
 * Date: 2/15/2024
 * File Name: creature.interface.ts
 * Description: Interface for the creature object
 */

// export the Creature interface
export interface Creature {
  _id?: string; // add an optional _id property
  name: string; // add a name property
  description: string; // add a description property
  abilities: string[]; // add an abilities property
  dangerLevel: number; // add a dangerLevel property
  habitat: string; // add a habitat property
}
