import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Beer } from 'src/app/interfaces/beer.interface';

@Injectable()
export class FilteredBeersService {
  private filteredBeersSubject = new BehaviorSubject<Beer[]>([]);
  // Observable to subscribe to get filtered beer updates
  filteredBeers$: Observable<Beer[]> = this.filteredBeersSubject.asObservable();

  // Update the filtered beers
  setFilteredBeers(beers: Beer[]) {
    this.filteredBeersSubject.next(beers);
  }
}
