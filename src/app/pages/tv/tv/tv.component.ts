import { Component } from '@angular/core';
import { Movie } from '../../../models/movie';
import { MovieService } from '../../../services/movie.service';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RecommendedMovieComponent } from '../../../shared/components/movie/recommended-movie.component';

@Component({
  selector: 'app-tv',
  standalone: true,
  imports: [CommonModule, RecommendedMovieComponent],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.css',
})
export class TvComponent {
  movies$!: Observable<Movie[]>;
  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.movie$.pipe(
      map((value) => value.sort((a, b) => a.title.localeCompare(b.title))),
      map((value) => {
        return value.filter((movie) => movie.category === 'TV Series');
      }),
      distinctUntilChanged((curr, next) => curr.length === next.length)
    );
  }
}
