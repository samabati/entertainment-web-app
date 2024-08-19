import { Component } from '@angular/core';
import { RecommendedMovieComponent } from '../../../../shared/components/movie/recommended-movie.component';
import { MovieService } from '../../../../services/movie.service';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { Movie } from '../../../../models/movie';
import { CommonModule } from '@angular/common';
import { NotTrendingPipe } from './nottrending';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recommended',
  standalone: true,
  imports: [RecommendedMovieComponent, CommonModule, NotTrendingPipe],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.css',
})
export class RecommendedComponent {
  movies$!: Observable<Movie[]>;

  constructor(private movieService: MovieService, private http: HttpClient) {
    this.movies$ = this.movieService.movie$.pipe(
      map((value) => value.sort((a, b) => a.title.localeCompare(b.title))),
      distinctUntilChanged((curr, next) => {
        return curr.length === next.length;
      })
    );
    this.getRequest();
  }

  getRequest() {
    console.log('Get request ran');
    this.http.get('http://localhost:3000/').subscribe((value) => {
      console.log(value);
    });
  }
}
