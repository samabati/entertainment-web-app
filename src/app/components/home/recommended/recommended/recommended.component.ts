import { Component } from '@angular/core';
import { RecommendedMovieComponent } from '../recommended-movie/recommended-movie.component';

@Component({
  selector: 'app-recommended',
  standalone: true,
  imports: [RecommendedMovieComponent],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.css',
})
export class RecommendedComponent {}
