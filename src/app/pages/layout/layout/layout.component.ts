import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../../components/home/navbar/navbar/navbar.component';
import { SearchComponent } from '../../../components/home/search/search/search.component';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchPageComponent } from '../../search/search/search.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    SearchComponent,
    RouterOutlet,
    SearchPageComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  search: string = '';

  setSearch(str: string) {
    this.search = str;
    console.log(this.search);
  }
}
