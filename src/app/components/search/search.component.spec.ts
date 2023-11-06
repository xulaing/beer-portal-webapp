import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerSearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: BeerSearchComponent;
  let fixture: ComponentFixture<BeerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeerSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BeerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
