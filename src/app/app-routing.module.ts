import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingleBeerComponent } from './pages/single-beer/single-beer.component';
import { RandomBeerResolver } from './pages/single-beer/random-beer-suggestion.resolver';
import { BrowseComponent } from './pages/browse/browse.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'single-beer/:id', component: SingleBeerComponent },
  {
    path: 'suggestion',
    component: SingleBeerComponent,
    resolve: {
      randomBeer: RandomBeerResolver,
    },
  },
  { path: 'browse', component: BrowseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
