import { Component, OnInit } from '@angular/core';
import { Beer } from 'src/app/interfaces/beer.interface';
import { BeerSearchService } from 'src/app/components/search/search.service';
import { FilteredBeersService } from 'src/app/components/filter/filter.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  filteredBeers: Beer[] = [];

  constructor(
    private beerService: BeerSearchService,
    private filteredBeersService: FilteredBeersService
  ) {}

  ngOnInit(): void {
    // Get all beers
    this.beerService.getAllBeers().subscribe((beers: Beer[]) => {
      this.filteredBeers = beers;
      this.filteredBeersService.setFilteredBeers(beers);
    });
  }
}
