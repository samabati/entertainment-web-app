import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { LayoutComponent } from './pages/layout/layout/layout.component';
import { MoviesComponent } from './pages/movies/movies/movies.component';
import { TvComponent } from './pages/tv/tv/tv.component';
import { BookmarkComponent } from './pages/bookmark/bookmark/bookmark.component';
import { LoginComponent } from './pages/login/login/login.component';
import { SignupComponent } from './pages/signup/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent }, // Default child route
      { path: 'movies', component: MoviesComponent },
      { path: 'tv', component: TvComponent },
      { path: 'bookmark', component: BookmarkComponent },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];
