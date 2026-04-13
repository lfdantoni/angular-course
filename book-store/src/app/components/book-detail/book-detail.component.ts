import { Component } from '@angular/core';
import { Location, AsyncPipe, NgStyle, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { BookStatusDirective } from '../../directives/book-status.directive';
import { BookReviewsComponent } from '../book-reviews/book-reviews.component';

// ── Lesson 3–4 approach (synchronous) — replaced in lesson 5 by book$ Observable ──
// Route params were read once via snapshot — no reactive stream.
//
// book: Book | undefined;
//
// ngOnInit(): void {
//   // snapshot.params: reads the current params once (not reactive to param changes).
//   // Use route.params.subscribe() if the component can be reused across different routes.
//   const id = Number(this.route.snapshot.params['id']);
//   this.book = this.bookService.getBookById(id);
// }
//
// In the template: @if (book) { ... } @else { <p>Book not found.</p> }
// ──────────────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-book-detail',
  imports: [BookStatusDirective, NgStyle, RouterLink, AsyncPipe, UpperCasePipe, BookReviewsComponent],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {
  // Inject Router and ActivatedRoute using inject() — modern approach
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  // Location.back() follows browser history — works from both /books and /books-obs
  private location = inject(Location);

  // switchMap: when route params change (navigating from /books/1 to /books/2),
  // the previous HTTP request is cancelled and a new one starts.
  // The async pipe in the template subscribes and unsubscribes automatically.
  book$ = this.route.params.pipe(
    switchMap(params => this.bookService.getBookById(Number(params['id']))),
    catchError(err => {
      console.error(err.message);
      return of(undefined); // emit undefined to show the "not found" block
    })
  );

  // Programmatic navigation using Location — goes back in browser history
  goBack(): void {
    this.location.back();
  }


  // Programmatic alternative to [queryParams] in template:
  // goToCategory(category: string): void {
  //   this.router.navigate(['/books'], { queryParams: { category } });
  // }
}
