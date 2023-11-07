import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BeerSearchService } from './search.service';
import { Beer } from '../../interfaces/beer.interface';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FilteredBeersService } from '../filter/filter.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class BeerSearchComponent implements OnInit {
  currentRoute: string = '';
  searchControl = new FormControl('');
  allBeers: Beer[] = [];
  filteredResults: Observable<Beer[]> | undefined;
  autocompletion: boolean = true;

  constructor(
    private beerService: BeerSearchService,
    private router: Router,
    private filteredBeersService: FilteredBeersService
  ) {
    this.router.events.subscribe((event) => {
      // Check if the event is a NavigationEnd event.
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.autocompletion = this.currentRoute === '/browse' ? false : true;
      }
    });
  }

  ngOnInit() {
    // Initialize all beers
    this.beerService.getAllBeers().subscribe((beers: Beer[]) => {
      this.allBeers = beers;
      this.beerService.setSearchedBeers(beers);
    });
    // Define an observable that captures changes in the value of a form control
    this.filteredResults = this.searchControl.valueChanges.pipe(
      // Start with an initial value of an empty string.
      startWith(''),
      // Map the beers returned by '_filter'
      map((value) => {
        const filteredBeers = this._filter(value || '');
        // Set the filtered beers in the service
        this.beerService.setSearchedBeers(filteredBeers);
        //this.filteredBeersService.setFilteredBeers(filteredBeers);
        return filteredBeers;
      })
    );
    // Clear input when the route changes
    this.clearInputOnRouteChange();
  }

  // Filter beers that contains the value in its name
  private _filter(value: any): Beer[] {
    return this.allBeers.filter((beer: Beer) =>
      beer.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  // Navigate to the single-beer route with the beer's ID as a parameter
  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    console.log('here');
    const selectedBeerName = event.option.value;
    const encodedBeerName = encodeURIComponent(selectedBeerName);
    this.beerService.searchBeer(encodedBeerName).subscribe((beer) => {
      this.router.navigate(['/single-beer', beer[0].id]);
      this.clearInput();
    });
  }

  // Clear input value
  public clearInput() {
    this.searchControl.setValue('');
  }

  // Add a function to clear the input when changing routes
  public clearInputOnRouteChange() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.clearInput();
      }
    });
  }
}
