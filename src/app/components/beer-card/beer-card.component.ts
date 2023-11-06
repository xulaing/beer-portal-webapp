import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Beer } from 'src/app/interfaces/beer.interface';
import { BeerDialogComponent } from '../beer-dialog/beer-dialog.component';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.css'],
})
export class BeerCardComponent {
  @Input() beer: Beer | undefined;
  image_url_undefined: string = 'https://images.punkapi.com/v2/keg.png';

  constructor(public dialog: MatDialog) {}

  // Open Beer Dialog
  openDialog(): void {
    if (this.beer) {
      const dialogRef = this.dialog.open(BeerDialogComponent, {
        data: {
          beerDetails: this.beer,
          beerIngredients: {
            hop: this.getUniqueIngredients(this.beer.ingredients.hops, 'name'),
            malt: this.getUniqueIngredients(this.beer.ingredients.malt, 'name'),
            yeast: this.beer.ingredients.yeast,
          },
        },
        width: '60%', // Set the width
        height: '500px', // Set the height
      });
      dialogRef.afterClosed().subscribe((result) => {
        // Handle the result if needed
      });
    }
  }

  private getUniqueIngredients(array: any[], property: string): string[] {
    return [...new Set(array.map((item) => item[property]))];
  }
}
