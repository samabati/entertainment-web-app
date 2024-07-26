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
export class TrendingMovieComponent {
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

  toggleMovieHover(bool: boolean) {
    this.movieHover = bool;
  }

  toggleHover(isHovered: boolean): void {
    this.bookMarkHover = isHovered;
  }

  toggleBookmark(): void {
    this.importedBookMarkState = !this.importedBookMarkState;
    this.movieService.bookMarkMovie(this.movieName, this.importedBookMarkState);
  }

  setBookmarkHover(isHovered: boolean): void {
    this.bookMarkHover = isHovered;
  }

  getBookmarkIcon(): string {
    if (this.importedBookMarkState) {
      return 'assets/trending/book-mark.svg';
    }
    return this.bookMarkHover
      ? 'assets/trending/white-book-mark.svg'
      : 'assets/trending/normal-book-mark.svg';
  }

  clickMovieHover() {
    this.movieHover = !this.movieHover;
  }
}
