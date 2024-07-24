import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TrendingMovieComponent } from '../trending-movie/trending-movie/trending-movie.component';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule, TrendingMovieComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css',
})
export class TrendingComponent {}
