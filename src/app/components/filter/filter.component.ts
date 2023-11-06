import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Beer } from 'src/app/interfaces/beer.interface';
import { FilteredBeersService } from './filter.service';
import { BeerSearchService } from '../search/search.service';
import { Observable, combineLatest, map, merge, of, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

interface SortOption {
  name: string;
  toHighest: boolean;
  param: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  sortOption: SortOption[] = [
    {
      name: 'ABV (lowest to highest)',
      toHighest: true,
      param: 'abv',
    },
    {
      name: 'ABV (highest to lowest)',
      toHighest: false,
      param: 'abv',
    },
    {
      name: 'EBC (lowest to highest)',
      toHighest: true,
      param: 'ebc',
    },
    {
      name: 'EBC (highest to lowest)',
      toHighest: false,
      param: 'ebc',
    },
    {
      name: 'IBU (lowest to highest',
      toHighest: true,
      param: 'ibu',
    },
    {
      name: 'IBU (highest to lowest)',
      toHighest: false,
      param: 'ibu',
    },
  ];
  selectedSortOption: SortOption | undefined;

  searchedBeers: Beer[] = [];
  filteredBeers: Beer[] = [];
  propertyControls: any[] = [];

  // ABV
  minAbvControl = new FormControl();
  maxAbvControl = new FormControl();

  // EBC
  minEbcControl = new FormControl();
  maxEbcControl = new FormControl();

  // IBU
  minIbuControl = new FormControl();
  maxIbuControl = new FormControl();

  // Ingredient
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientControl = new FormControl('');
  filteredIngredients: Observable<string[]> = of([]);
  selectedIngredients: string[] = []; // Array to store selected ingredients
  allIngredients: string[] = [];

  @ViewChild('ingredientInput') ingredientInput!: ElementRef<HTMLInputElement>;

  constructor(
    private filteredBeersService: FilteredBeersService,
    private beerService: BeerSearchService
  ) {}

  ngOnInit() {
    this.beerService.searchedBeers$.subscribe((beers) => {
      // Get all beers from the search bar
      this.searchedBeers = beers;
      // Apply filter if filters are already set
      this.filteredBeers = this.filterBeers();
      this.selectedSortOptionChange();

      // Get all ingredients
      const uniqueIngredients: Set<string> = new Set();

      for (const beer of this.searchedBeers) {
        // Extract hop ingredients
        if (beer.ingredients.hops && Array.isArray(beer.ingredients.hops)) {
          beer.ingredients.hops.forEach((hop) =>
            uniqueIngredients.add(hop.name)
          );
        }

        // Extract malt ingredients
        if (beer.ingredients.malt && Array.isArray(beer.ingredients.malt)) {
          beer.ingredients.malt.forEach((malt) =>
            uniqueIngredients.add(malt.name)
          );
        }

        // Extract yeast ingredient
        if (beer.ingredients.yeast) {
          uniqueIngredients.add(beer.ingredients.yeast);
        }
      }

      // Convert the Set back to an array
      this.allIngredients = Array.from(uniqueIngredients);
    });

    this.propertyControls = [
      {
        label: 'ABV (Alcohol by Volume)',
        minControl: this.minAbvControl,
        maxControl: this.maxAbvControl,
        property: 'abv',
      },
      {
        label: 'EBC (European Brewery Convention)',
        minControl: this.minEbcControl,
        maxControl: this.maxEbcControl,
        property: 'ebc',
      },
      {
        label: 'IBU (International Bitterness Units)',
        minControl: this.minIbuControl,
        maxControl: this.maxIbuControl,
        property: 'ibu',
      },
    ];

    // Combine all the filters
    merge(
      this.minAbvControl.valueChanges,
      this.maxAbvControl.valueChanges,
      this.minEbcControl.valueChanges,
      this.maxEbcControl.valueChanges,
      this.minIbuControl.valueChanges,
      this.maxIbuControl.valueChanges,
      this.ingredientControl.valueChanges
    ).subscribe(() => {
      this.filteredBeers = this.filterBeers();
      this.selectedSortOptionChange();
    });

    this.filteredIngredients = this.ingredientControl.valueChanges.pipe(
      startWith(null),
      map((ingredient: string | null) => {
        return ingredient
          ? this._filterIngredients(ingredient)
          : this.allIngredients.slice();
      })
    );
  }

  // Sort beers
  sortBeersByOption(option: string, toHighest: boolean): Beer[] {
    const sortedBeers = [...this.filteredBeers];
    // Check if the beers are sortable
    if (option && this.isSortableProperty(option) && sortedBeers) {
      // Sort accordingly to option and toHighest
      sortedBeers.sort((a, b) => {
        if (a[option] < b[option]) {
          return toHighest ? -1 : 1;
        } else if (a[option] > b[option]) {
          return toHighest ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    return sortedBeers;
  }

  // Check if the property is correct
  isSortableProperty(property: string): property is keyof Beer {
    return property === 'abv' || property === 'ibu' || property === 'ebc';
  }

  // Sort and update the list of beers
  selectedSortOptionChange() {
    if (this.selectedSortOption) {
      const sortedBeers = this.sortBeersByOption(
        this.selectedSortOption.param,
        this.selectedSortOption.toHighest
      );
      this.filteredBeersService.setFilteredBeers(sortedBeers);
    } else {
      this.filteredBeersService.setFilteredBeers(this.filteredBeers);
    }
  }

  // Add a selected ingredient
  addIngredient(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedIngredients.push(value);
    }

    event.chipInput!.clear();
    this.ingredientControl.setValue(null);
  }

  // Remove from selected ingredients
  removeIngredient(ingredient: string): void {
    const index = this.selectedIngredients.indexOf(ingredient);

    if (index >= 0) {
      this.selectedIngredients.splice(index, 1);
    }

    this.filteredBeers = this.filterBeers();
    this.selectedSortOptionChange();
  }

  // Select an ingredient from the autocomplete dropdown.
  selectedIngredient(event: MatAutocompleteSelectedEvent): void {
    this.selectedIngredients.push(event.option.viewValue);
    // Clear the input field and reset the ingredient control after selection.
    this.ingredientInput.nativeElement.value = '';
    this.ingredientControl.setValue(null);
  }

  // Filter all ingredients by input value
  private _filterIngredients(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allIngredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(filterValue)
    );
  }

  // Apply all filters on the searched beers
  private filterBeers(): Beer[] {
    // Extract min and max ABV, EBC, and IBU values from form controls.
    const minValueAbv = this.minAbvControl.value;
    const maxValueAbv = this.maxAbvControl.value;
    const minValueEbc = this.minEbcControl.value;
    const maxValueEbc = this.maxEbcControl.value;
    const minValueIbu = this.minIbuControl.value;
    const maxValueIbu = this.maxIbuControl.value;

    // Filter beers based on ABV, EBC, IBU and ingredients values.
    return this.searchedBeers.filter((beer) => {
      const abv = beer.abv;
      const ebc = beer.ebc;
      const ibu = beer.ibu;

      // Apply property filters based on min and max values.
      const propertyFilter =
        (!minValueAbv || abv >= minValueAbv) &&
        (!maxValueAbv || abv <= maxValueAbv) &&
        (!minValueEbc || ebc >= minValueEbc) &&
        (!maxValueEbc || ebc <= maxValueEbc) &&
        (!minValueIbu || ibu >= minValueIbu) &&
        (!maxValueIbu || ibu <= maxValueIbu);

      if (!propertyFilter) {
        return false; // Property filter does not match, skip this beer
      }

      // Apply ingredient filters based on selected ingredients.
      const ingredientFilter = this.selectedIngredients.every((ingredient) => {
        return (
          (beer.ingredients.malt &&
            beer.ingredients.malt.some((malt) => malt.name === ingredient)) ||
          (beer.ingredients.hops &&
            beer.ingredients.hops.some((hop) => hop.name === ingredient)) ||
          beer.ingredients.yeast === ingredient
        );
      });

      return ingredientFilter; // Only include beers that match both property and ingredient filters
    });
  }
}
