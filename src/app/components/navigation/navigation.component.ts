import { Component, OnInit } from '@angular/core';
import { SingleBeerService } from 'src/app/pages/single-beer/single-beer.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  currentRoute: string = '';
  showSearchBar: boolean = false;

  constructor(
    private singleBeerService: SingleBeerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to route change events using the router.
    this.router.events.subscribe((event) => {
      // Check if the event is a NavigationEnd event.
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        // Set 'showSearchBar' to true if the current route is not '/browse', otherwise set it to false.
        this.showSearchBar = this.currentRoute != '/browse' ? true : false;

        if (this.currentRoute !== '/suggestion') {
          this.singleBeerService.reloadRandomBeer(false);
        }
      }
    });
  }

  // Reload a random beer
  reloadRandomBeer() {
    if (this.currentRoute === '/suggestion') {
      this.singleBeerService.reloadRandomBeer(true);
    }
  }

  // Check if the route correspond to the value
  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }
}
