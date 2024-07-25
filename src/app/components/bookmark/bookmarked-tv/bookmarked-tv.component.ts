import { Component } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { map, Observable } from 'rxjs';
import { Movie } from '../../../models/movie';
import { CommonModule } from '@angular/common';
import { RecommendedMovieComponent } from '../../../shared/components/movie/recommended-movie.component';

@Component({
  selector: 'app-bookmarked-tv',
  standalone: true,
  imports: [CommonModule, RecommendedMovieComponent],
  templateUrl: './bookmarked-tv.component.html',
  styleUrl: './bookmarked-tv.component.css',
})
export class BookmarkedTvComponent {
  tvs$!: Observable<Movie[]>;

  constructor(private movieService: MovieService) {
    this.tvs$ = this.movieService.movie$.pipe(
      map((value) => {
        return value.filter(
          (movie) =>
            movie.category === 'TV Series' && movie.isBookmarked === true
        );
      })
    );
  }
}
