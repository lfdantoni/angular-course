import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Book } from '../models/book';
import { booksMock } from '../mock-data/books';

// Observable-based alternative to BookService (which uses Signals).
// Use this as a reference to understand how the same state management
// looks with RxJS before Signals were introduced (Angular < 16).
@Injectable({ providedIn: 'root' })
export class BookObservableService {
  // BehaviorSubject: like Subject but holds the current value and emits it
  // immediately to any new subscriber. Requires an initial value.
  private booksSubject = new BehaviorSubject<Book[]>([...booksMock]);

  // asObservable() — exposes the subject as a read-only Observable.
  // Consumers can subscribe but cannot call .next() externally.
  books$: Observable<Book[]> = this.booksSubject.asObservable();

  // pipe(map()) — derived stream; recalculates every time books$ emits.
  // Equivalent of computed() in the Signals version.
  totalBooks$: Observable<number> = this.books$.pipe(
    map(books => books.length)
  );

  // Singleton demo — same timestamp shared across all injected instances
  readonly createdAt = new Date();

  getBooks(): Book[] {
    // getValue() reads the current value synchronously — use sparingly
    return this.booksSubject.getValue();
  }

  getBookById(id: number): Book | undefined {
    return this.booksSubject.getValue().find(b => b.id === id);
  }

  addBook(book: Book): void {
    // next() emits a new value to all subscribers
    this.booksSubject.next([...this.booksSubject.getValue(), book]);
  }

  deleteBook(id: number): void {
    this.booksSubject.next(this.booksSubject.getValue().filter(b => b.id !== id));
  }

  nextId(): number {
    return Math.max(...this.booksSubject.getValue().map(b => b.id)) + 1;
  }
}
