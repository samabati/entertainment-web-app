import { Component } from '@angular/core';
import { RecommendedMovieComponent } from '../../../../shared/components/movie/recommended-movie.component';
import { MovieService } from '../../../../services/movie.service';
import { Observable } from 'rxjs';
import { Movie } from '../../../../models/movie';
import { CommonModule } from '@angular/common';
import { NotTrendingPipe } from './nottrending';

@Component({
  selector: 'app-recommended',
  standalone: true,
  imports: [RecommendedMovieComponent, CommonModule, NotTrendingPipe],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.css',
})
export class RecommendedComponent {
  movies$!: Observable<Movie[]>;

  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.movie$;
  }
}
