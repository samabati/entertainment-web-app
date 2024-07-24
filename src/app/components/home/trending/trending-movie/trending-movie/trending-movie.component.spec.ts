import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingMovieComponent } from './trending-movie.component';

describe('TrendingMovieComponent', () => {
  let component: TrendingMovieComponent;
  let fixture: ComponentFixture<TrendingMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingMovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
