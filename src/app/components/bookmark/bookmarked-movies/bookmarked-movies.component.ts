import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { map, Observable } from 'rxjs';
import { Movie } from '../../../models/movie';
import { CommonModule } from '@angular/common';
import { TrendingMovieComponent } from '../../home/trending/trending-movie/trending-movie/trending-movie.component';
import { RecommendedMovieComponent } from '../../../shared/components/movie/recommended-movie.component';

@Component({
  selector: 'app-bookmarked-movies',
  standalone: true,
  imports: [CommonModule, RecommendedMovieComponent],
  templateUrl: './bookmarked-movies.component.html',
  styleUrl: './bookmarked-movies.component.css',
})
export class BookmarkedMoviesComponent implements OnInit {
  movies$!: Observable<Movie[]>;

  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.movie$.pipe(
      map((value) => {
        return value.filter((movie) => {
          return movie.category === 'Movie' && movie.isBookmarked === true;
        });
      })
    );
  }
  ngOnInit(): void {
    this.movies$.subscribe((value) => {
      console.log(value);
    });
  }
}
