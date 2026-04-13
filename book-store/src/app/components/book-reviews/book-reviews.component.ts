import { Component, input } from '@angular/core';

// Placeholder component used to demonstrate @defer in book-detail.
// In a real app this would fetch reviews from an API — heavy enough to justify lazy loading.
@Component({
  selector: 'app-book-reviews',
  imports: [],
  templateUrl: './book-reviews.component.html',
  styleUrl: './book-reviews.component.css'
})
export class BookReviewsComponent {
  // input() signal — receives the book id from the parent
  bookId = input.required<number>();
}
