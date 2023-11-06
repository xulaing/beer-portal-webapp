import { Component, Input, Renderer2, ElementRef, OnInit } from '@angular/core';
import { BeerIngredients } from 'src/app/interfaces/beer-ingredients.interface';
import { Beer } from 'src/app/interfaces/beer.interface';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css'],
})
export class BeerDetailsComponent implements OnInit {
  @Input() beerDetails: Beer | undefined;
  @Input() beerIngredients: BeerIngredients | undefined;
  @Input() inDialog: boolean = false;

  constructor() {}

  ngOnInit() {}
}
