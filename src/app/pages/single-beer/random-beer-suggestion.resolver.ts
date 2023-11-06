import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Beer } from 'src/app/interfaces/beer.interface';
import { SingleBeerService } from './single-beer.service';

@Injectable({
  providedIn: 'root',
})
export class RandomBeerResolver implements Resolve<Beer[]> {
  constructor(private beerService: SingleBeerService) {}

  resolve(): Observable<Beer[]> {
    return this.beerService.getRandomBeer();
  }
}
