import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedMovieComponent } from './recommended-movie.component';

describe('RecommendedMovieComponent', () => {
  let component: RecommendedMovieComponent;
  let fixture: ComponentFixture<RecommendedMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedMovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
