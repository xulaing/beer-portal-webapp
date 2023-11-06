import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  forkJoin,
  map,
  of,
} from 'rxjs';
import { Beer } from 'src/app/interfaces/beer.interface';

@Injectable({
  providedIn: 'root',
})
export class BeerSearchService {
  private apiUrl = 'https://api.punkapi.com/v2/beers';
  private searchedBeersSubject = new BehaviorSubject<Beer[]>([]);
  searchedBeers$: Observable<Beer[]> = this.searchedBeersSubject.asObservable();

  constructor(private http: HttpClient) {}

  setSearchedBeers(beers: Beer[]) {
    this.searchedBeersSubject.next(beers);
  }

  // Get 80*number_of_page beers from punk api
  getAllBeers(): Observable<Beer[]> {
    const page1$ = this.http.get<Beer[]>(`${this.apiUrl}?page=1&per_page=80`);
    const page2$ = this.http.get<Beer[]>(`${this.apiUrl}?page=2&per_page=80`);
    const page3$ = this.http.get<Beer[]>(`${this.apiUrl}?page=3&per_page=80`);
    const page4$ = this.http.get<Beer[]>(`${this.apiUrl}?page=4&per_page=80`);

    return forkJoin([page1$, page2$, page3$, page4$]).pipe(
      map((responses) => {
        const allBeers: Beer[] = [];
        responses.forEach((response) => {
          allBeers.push(...response);
        });
        return allBeers;
      })
    );
  }

  // Get beer by name
  searchBeer(searchTerm: string): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${this.apiUrl}?beer_name=${searchTerm}`);
  }
}
