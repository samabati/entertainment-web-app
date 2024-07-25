import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../../components/home/navbar/navbar/navbar.component';
import { SearchComponent } from '../../../components/home/search/search/search.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, SearchComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
