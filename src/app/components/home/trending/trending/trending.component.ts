import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TrendingMovieComponent } from '../trending-movie/trending-movie/trending-movie.component';
import { MovieService } from '../../../../services/movie.service';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { Movie } from '../../../../models/movie';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule, TrendingMovieComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css',
})
export class TrendingComponent implements OnInit {
  movies$!: Observable<Movie[]>;

  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.movie$.pipe(
      map((value) => {
        return value.filter((movie) => movie.isTrending == true);
      }),
      map((value) => {
        return value.sort((a, b) => a.title.localeCompare(b.title));
      }),

      distinctUntilChanged((prev, curr) => prev.length === curr.length)
    );
  }

  ngOnInit(): void {
    this.movies$.subscribe((value) => {
      console.log(value);
    });
  }
}
