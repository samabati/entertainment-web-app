import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movieSubject = new BehaviorSubject<Movie[]>([]);
  movie$ = this.movieSubject.asObservable();
  constructor(private http: HttpClient) {
    this.loadMovies();
  }

  private loadMovies() {
    this.http.get<Movie[]>('assets/data/data.json').subscribe((value) => {
      this.movieSubject.next(value);
    });
  }

  refreshMovies() {
    this.loadMovies();
  }

  bookMarkMovie(movieName: string, bool: boolean) {
    let filteredMovie: Movie | undefined = this.movieSubject.value.find(
      (movie) => movie.title === movieName
    );
    if (filteredMovie) {
      filteredMovie.isBookmarked = bool;
      this.movieSubject.next([...this.filterMovie(movieName), filteredMovie]);
    } else {
      console.log('Movie not found!');
    }
  }

  filterMovie(movieName: string): Movie[] {
    return this.movieSubject.value.filter((movie) => movie.title !== movieName);
  }
}
