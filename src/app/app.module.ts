import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BeerSearchComponent } from './components/search/search.component';
import { SingleBeerComponent } from './pages/single-beer/single-beer.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { FilterComponent } from './components/filter/filter.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { BeerCardComponent } from './components/beer-card/beer-card.component';
import { BeerDetailsComponent } from './components/beer-details/beer-details.component';
import { BeerDialogComponent } from './components/beer-dialog/beer-dialog.component';

import { FilteredBeersService } from './components/filter/filter.service';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    BeerSearchComponent,
    SingleBeerComponent,
    BrowseComponent,
    FilterComponent,
    CatalogComponent,
    BeerCardComponent,
    BeerDetailsComponent,
    BeerDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [FilteredBeersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
