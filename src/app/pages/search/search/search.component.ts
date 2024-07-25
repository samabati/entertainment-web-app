import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../../../models/movie';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../services/movie.service';
import { RecommendedMovieComponent } from '../../../shared/components/movie/recommended-movie.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, RecommendedMovieComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchPageComponent implements OnInit, OnChanges {
  movies$!: Observable<Movie[]>;
  @Input() searchTerm!: string;

  constructor(private movieService: MovieService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.updateMovies();
    }
  }
  ngOnInit(): void {
    this.updateMovies();
  }

  private updateMovies() {
    this.movies$ = this.movieService.movie$.pipe(
      map((value) => {
        return value.filter((movie) =>
          movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      })
    );
  }
}
