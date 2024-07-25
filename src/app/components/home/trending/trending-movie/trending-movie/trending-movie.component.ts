import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Movie } from '../../../../../models/movie';
import { MovieService } from '../../../../../services/movie.service';

@Component({
  selector: 'app-trending-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending-movie.component.html',
  styleUrl: './trending-movie.component.css',
})
export class TrendingMovieComponent implements OnInit {
  @Input() movieName!: string;
  @Input() movieYear!: number;
  @Input() movieType!: string;
  @Input() movieRating!: string;
  @Input() movieImage!: string;
  @Input() importedBookMarkState!: boolean;

  movieHover = false;
  bookMarkHover = false;
  bookMarkState!: boolean;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.bookMarkState = this.importedBookMarkState;
  }

  toggleMovieHover(bool: boolean) {
    this.movieHover = bool;
  }

  toggleBookMarkState(str: string) {
    if (str === 'hover') {
      this.bookMarkHover = true;
    }
    if (str === 'normal') {
      this.bookMarkHover = false;
    }
    if (str === 'bookmark') {
      if (!this.bookMarkState) {
        this.bookMarkState = true;
        this.movieService.bookMarkMovie(this.movieName, true);
      } else {
        this.bookMarkHover = false;
      }
    }
    if (str === 'remove-bookmark') {
      this.bookMarkState = false;
      this.movieService.bookMarkMovie(this.movieName, false);
    }
  }
}
