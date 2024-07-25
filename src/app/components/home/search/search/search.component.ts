import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchHover = false;

  @Output() search = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]],
    });
  }

  submitSearch() {
    this.search.emit(this.searchForm.get('search')?.value);
  }

  toggleSearchHover(bool: boolean) {
    this.searchHover = bool;
  }
}
