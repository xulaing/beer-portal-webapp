import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { Beer } from 'src/app/interfaces/beer.interface';

@Injectable({
  providedIn: 'root',
})
export class SingleBeerService {
  private apiUrl = 'https://api.punkapi.com/v2/beers';

  private reloadRandomBeerSource = new BehaviorSubject<boolean>(false);
  reloadRandomBeer$ = this.reloadRandomBeerSource.asObservable();

  constructor(private http: HttpClient) {}

  getBeerDetails(id: number): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${this.apiUrl}/${id}`);
  }

  getRandomBeer(): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${this.apiUrl}/random`);
  }

  reloadRandomBeer() {
    this.reloadRandomBeerSource.next(true);
  }
}
