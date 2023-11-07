import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleBeerService } from './single-beer.service';
import { Beer } from 'src/app/interfaces/beer.interface';
import { BeerIngredients } from 'src/app/interfaces/beer-ingredients.interface';

@Component({
  selector: 'app-single-beer',
  templateUrl: './single-beer.component.html',
  styleUrls: ['./single-beer.component.css'],
})
export class SingleBeerComponent implements OnInit {
  beerDetails: Beer | undefined = undefined; // Beer informations
  beerIngredients: BeerIngredients | undefined; // Beer ngredients (hop, malt, yeast)
  image_url_undefined: string = 'https://images.punkapi.com/v2/keg.png'; // Null image url from punkapi

  constructor(
    private route: ActivatedRoute,
    private beerService: SingleBeerService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const randomBeer: Beer[] = data['randomBeer'];
      // If /suggestion
      if (randomBeer) {
        // Get random beer information
        this.beerDetails = randomBeer[0];
        this.beerIngredients = this.getIngredients(this.beerDetails);
      } else {
        // If specific beer
        // Retrieve the beer ID parameter from the route
        this.route.paramMap.subscribe((params) => {
          const beerIdString = params.get('id');
          if (beerIdString) {
            const beerId: number = parseInt(beerIdString);
            // Get specific beer information
            this.beerService.getBeerDetails(beerId).subscribe((beer) => {
              this.beerDetails = beer[0];
              this.beerIngredients = this.getIngredients(this.beerDetails);
            });
          }
        });
      }
    });
    // Reload a random beer
    this.beerService.reloadRandomBeer$.subscribe((reload) => {
      if (reload) {
        console.log('hein');
        this.reloadRandomBeer();
      }
    });
  }

  reloadRandomBeer() {
    console.log('help');
    this.beerService.getRandomBeer().subscribe((beer: Beer[]) => {
      // Update beerDetails with the new random beer
      this.beerDetails = beer[0];
      this.beerIngredients = {
        hop: this.getUniqueIngredients(
          this.beerDetails.ingredients.hops,
          'name'
        ),
        malt: this.getUniqueIngredients(
          this.beerDetails.ingredients.malt,
          'name'
        ),
        yeast: this.beerDetails.ingredients.yeast,
      };
    });
  }

  private getUniqueIngredients(array: any[], property: string): string[] {
    return [...new Set(array.map((item) => item[property]))];
  }

  private getIngredients(beer: Beer) {
    return {
      hop: this.getUniqueIngredients(beer.ingredients.hops, 'name'),
      malt: this.getUniqueIngredients(beer.ingredients.malt, 'name'),
      yeast: beer.ingredients.yeast,
    };
  }
}
