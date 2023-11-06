import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Beer } from 'src/app/interfaces/beer.interface';
import { FilteredBeersService } from '../filter/filter.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  private _beers: Beer[] = [];
  loadedBeers: Beer[] = [];
  isLoading = false;

  constructor(private filteredBeersService: FilteredBeersService) {}

  ngOnInit(): void {
    // Subscribe to the filteredBeers$ observable to get updates
    this.filteredBeersService.filteredBeers$.subscribe((filteredBeers) => {
      this._beers = filteredBeers;
      this.loadedBeers = [];
      this.loadMoreCards();
    });

    this.loadMoreCards();
  }

  // Check if needed to load more beers
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (!this.isLoading) {
      const container = document.querySelector('.catalog');
      if (container) {
        const scrollPosition = container.scrollTop;
        const containerHeight = container.clientHeight;
        const contentHeight = container.scrollHeight;

        // Define a scroll threshold (e.g., 100 pixels from the bottom)
        const scrollThreshold = 100;

        if (
          contentHeight - scrollPosition - containerHeight <
          scrollThreshold
        ) {
          this.loadMoreCards();
        }
      }
    }
  }

  // Lazy loading
  loadMoreCards() {
    this.isLoading = true;
    const startIndex = this.loadedBeers.length;
    const endIndex = startIndex + 30;

    // Addd +30 beers
    if (startIndex < this._beers.length) {
      const nextSetOfCards = this._beers.slice(startIndex, endIndex);
      this.loadedBeers = this.loadedBeers.concat(nextSetOfCards);
    }

    this.isLoading = false;
  }
}
