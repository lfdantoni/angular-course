import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookComponent } from '../book/book.component';
import { Book } from '../../models/book';
import { BookObservableService } from '../../services/book-observable.service';

// Observable-based alternative to BookListComponent (which uses Signals + computed).
// Key differences:
//   Signals version  → computed() auto-updates, no manual cleanup needed
//   Observable version → must subscribe manually, must unsubscribe to avoid memory leaks
@Component({
  selector: 'app-book-list-obs',
  imports: [BookComponent],
  templateUrl: './book-list-obs.component.html',
  styleUrl: './book-list-obs.component.css'
})
export class BookListObsComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private bookService = inject(BookObservableService);

  books: Book[] = [];
  totalBooks = 0;
  categories: string[] = [];
  activeCategory = '';

  // Store subscriptions to unsubscribe in ngOnDestroy and avoid memory leaks
  private subscriptions = new Subscription();

  ngOnInit(): void {
    // subscribe() with the full observer object { next, error, complete }
    // Equivalent of reading a computed() signal — but explicit and manual.
    const booksSub = this.bookService.books$.subscribe({
      next: (books) => {
        this.books = this.activeCategory
          ? books.filter(b => b.categories.includes(this.activeCategory))
          : books;
        // Derive categories from the full list on every emission
        this.categories = [...new Set(books.flatMap(b => b.categories))].sort();
      },
      error: (err) => console.error('Error loading books:', err),
      complete: () => console.log('books$ completed'),
    });

    const totalSub = this.bookService.totalBooks$.subscribe({
      next: (total) => this.totalBooks = total,
    });

    // add() groups subscriptions — calling this.subscriptions.unsubscribe()
    // cancels all of them at once in ngOnDestroy
    this.subscriptions.add(booksSub);
    this.subscriptions.add(totalSub);
  }

  // ngOnDestroy: unsubscribing here is mandatory.
  // Without it, the subscriptions keep running after the component is removed from the DOM
  // — this is a memory leak and a common bug in Observable-based components.
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  filterByCategory(category: string): void {
    this.activeCategory = category;
    // Re-filter against the current snapshot — triggers a local state update.
    // In the Signals version this is automatic via computed().
    const all = this.bookService.getBooks();
    this.books = category ? all.filter(b => b.categories.includes(category)) : all;
  }

  clearFilter(): void {
    this.filterByCategory('');
  }

  deleteBook(book: Book): void {
    this.bookService.deleteBook(book.id);
    // books$ will emit the updated list → the subscription in ngOnInit re-runs automatically
  }

  navigateToDetail(book: Book): void {
    this.router.navigate(['/books', book.id]);
  }
}
