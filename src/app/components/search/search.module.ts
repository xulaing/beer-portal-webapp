import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeerSearchComponent } from './search.component';

@NgModule({
  declarations: [BeerSearchComponent], // Declare your home component
  imports: [
    CommonModule, // You can import other modules here if needed
  ],
})
export class SearchModule {}
