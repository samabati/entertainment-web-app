import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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

  movieHover = false;
  bookMarkState = 'normal';

  toggleMovieHover(bool: boolean) {
    this.movieHover = bool;
  }

  toggleBookMarkState(str: string) {
    this.bookMarkState = str;
  }
}
