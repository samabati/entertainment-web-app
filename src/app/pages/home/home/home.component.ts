import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../../components/home/navbar/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from '../../../components/home/search/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrendingComponent } from '../../../components/home/trending/trending/trending.component';
import { RecommendedComponent } from '../../../components/home/recommended/recommended/recommended.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TrendingComponent, RecommendedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
