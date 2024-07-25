import { Component } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { map, Observable } from 'rxjs';
import { Movie } from '../../../models/movie';
import { CommonModule } from '@angular/common';
import { RecommendedMovieComponent } from '../../../shared/components/movie/recommended-movie.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RecommendedMovieComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  movies$!: Observable<Movie[]>;
  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.movie$.pipe(
      map((value) => {
        return value.filter((movie) => movie.category === 'Movie');
      })
    );
  }
}
