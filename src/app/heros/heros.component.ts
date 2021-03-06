import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  heros: Hero[];

  constructor( private heroservice: HeroService) { }

  ngOnInit() {
    this.getHeros();
  }
getHeros(): void{
  this.heroservice.getHeros()
    .subscribe(heros => this.heros= heros);
}
add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroservice.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heros.push(hero);
    });
}

delete(hero: Hero): void {
  this.heros = this.heros.filter(h => h !== hero);
  this.heroservice.deleteHero(hero).subscribe();
}
}
