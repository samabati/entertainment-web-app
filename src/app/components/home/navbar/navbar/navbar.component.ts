import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  currentlySelected = '/';

  @Output() clearSearch = new EventEmitter<string>();

  constructor(private router: Router) {}

  updateNav(name: string) {
    this.clearSearch.emit('clear search');
    this.currentlySelected = name;
    this.router.navigate([name]);
  }
}
