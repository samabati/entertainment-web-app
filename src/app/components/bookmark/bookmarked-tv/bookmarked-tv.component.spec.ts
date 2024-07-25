import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkedTvComponent } from './bookmarked-tv.component';

describe('BookmarkedTvComponent', () => {
  let component: BookmarkedTvComponent;
  let fixture: ComponentFixture<BookmarkedTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkedTvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkedTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
