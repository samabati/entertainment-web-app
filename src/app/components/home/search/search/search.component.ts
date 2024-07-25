import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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

  ngOnInit() {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.search.emit(value);
      });
  }

  toggleSearchHover(bool: boolean) {
    this.searchHover = bool;
  }
}
