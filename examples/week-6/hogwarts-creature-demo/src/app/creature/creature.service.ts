/**
 * Author: Professor Krasso
 * Date: 2/15/2024
 * File Name: creature.service.ts
 * Description: This service is responsible for making HTTP requests to the server to get, create, update, and delete creatures.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Creature } from './creature.interface';

@Injectable({
  providedIn: 'root'
})
export class CreatureService {

  constructor(private http: HttpClient) { }

  /**
   * @description This method makes an HTTP get request to the server to get all creatures
   * @returns The creatures from the server
   */
  getCreatures() {
    return this.http.get<Creature[]>('/api/creatures');
  }

  /**
   * @description This method makes an HTTP delete request to the server to delete a creature
   * @param id  The id of the creature to delete
   * @returns The result of the HTTP delete request
   */
  deleteCreature(id: string) {
    return this.http.delete(`/api/creatures/${id}`);
  }

  /**
   * @description This method makes an HTTP get request to the server to get a creature with the specified id
   * @param id The id of the creature to get
   * @returns The creature with the specified id
   */
  getCreature(id: string) {
    return this.http.get<Creature>(`/api/creatures/${id}`);
  }

  /**
   * @description This method makes an HTTP put request to the server to update a creature
   * @param creature The creature to update
   * @returns The result of the HTTP put request
   */
  updateCreature(creature: Creature) {
    return this.http.put(`/api/creatures/${creature._id}`, {
      name: creature.name,
      description: creature.description,
      abilities: creature.abilities,
      dangerLevel: creature.dangerLevel,
      habitat: creature.habitat
    });
  }

  /**
   * @description This method makes an HTTP post request to the server to create a creature
   * @param creature The creature to create
   * @returns The result of the HTTP post request
   */
  createCreature(creature: Creature) {
    return this.http.post('/api/creatures', {
      name: creature.name,
      description: creature.description,
      abilities: creature.abilities,
      dangerLevel: creature.dangerLevel,
      habitat: creature.habitat
    });
  }
}
