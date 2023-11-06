import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeerDialogComponent } from './beer-dialog.component';

@NgModule({
  declarations: [BeerDialogComponent], // Declare your home component
  imports: [
    CommonModule, // You can import other modules here if needed
  ],
})
export class SearchModule {}
