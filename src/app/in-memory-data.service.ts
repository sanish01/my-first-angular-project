import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heros = [
      {id:11, name: 'vegeta'},
    {id:12, name: 'hugon'},
    {id:13, name: 'songoku'},
    {id:14, name: 'spaman'},
    {id:15, name: 'narcos'},
    {id:16, name: 'witches'},
    {id:17, name: 'warewolf'},
    {id:18, name: 'vampire'},
    {id:19, name: 'ironman'},
    {id:20, name: 'hazard'}
    ];
    return {heros};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
