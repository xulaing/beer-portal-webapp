import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BeerIngredients } from 'src/app/interfaces/beer-ingredients.interface';
import { Beer } from 'src/app/interfaces/beer.interface';

@Component({
  selector: 'app-beer-dialog',
  templateUrl: './beer-dialog.component.html',
  styleUrls: ['./beer-dialog.component.css'],
})
export class BeerDialogComponent {
  beerDetails: Beer | undefined;
  beerIngredients: BeerIngredients | undefined;
  image_url_undefined: string = 'https://images.punkapi.com/v2/keg.png';

  constructor(
    public dialogRef: MatDialogRef<BeerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // Access the data passed to the dialog
    this.beerDetails = this.data.beerDetails;
    this.beerIngredients = this.data.beerIngredients;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
