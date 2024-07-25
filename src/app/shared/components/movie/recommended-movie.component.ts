import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recommended-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommended-movie.component.html',
  styleUrl: './recommended-movie.component.css',
})
export class RecommendedMovieComponent {
  @Input() movieName!: string;
  @Input() movieYear!: number;
  @Input() movieType!: string;
  @Input() movieRating!: string;
  @Input() movieImage!: string;

  movieHover = false;
  bookMarkState = 'normal';

  toggleMovieHover(bool: boolean) {
    this.movieHover = bool;
  }

  toggleBookMarkState(str: string) {
    this.bookMarkState = str;
  }
}
