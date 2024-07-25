import { Component } from '@angular/core';
import { BookmarkedMoviesComponent } from '../../../components/bookmark/bookmarked-movies/bookmarked-movies.component';
import { BookmarkedTvComponent } from '../../../components/bookmark/bookmarked-tv/bookmarked-tv.component';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [BookmarkedMoviesComponent, BookmarkedTvComponent],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css',
})
export class BookmarkComponent {}
