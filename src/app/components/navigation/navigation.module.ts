import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './navigation.component'; // Import your home component

@NgModule({
  declarations: [NavigationComponent], // Declare your home component
  imports: [
    CommonModule, // You can import other modules here if needed
  ],
})
export class NavigationModule {}
