import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../../../../models/movie';

@Pipe({
  name: 'notTrending',
  standalone: true,
})
export class NotTrendingPipe implements PipeTransform {
  transform(movies: Movie[]): Movie[] {
    return movies.filter((movie) => movie.isTrending === false);
  }
}
