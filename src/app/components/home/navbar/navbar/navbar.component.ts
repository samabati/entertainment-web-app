import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  constructor(private router: Router) {}

  updateNav(name: string) {
    this.currentlySelected = name;
    this.router.navigate([name]);
  }
}
