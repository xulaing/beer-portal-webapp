import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component'; // Import your home component

@NgModule({
  declarations: [HomeComponent], // Declare your home component
  imports: [
    CommonModule, // You can import other modules here if needed
  ],
})
export class HomeModule {}
