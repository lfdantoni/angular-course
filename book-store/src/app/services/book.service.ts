import { computed, Injectable, signal } from '@angular/core';
import { Book } from '../models/book';
import { booksMock } from '../mock-data/books';

// @Injectable({ providedIn: 'root' }) — registers this service as a singleton
// available anywhere in the app without needing to add it to a providers array.
// Angular's DI creates one instance and reuses it across all components.
@Injectable({ providedIn: 'root' })
export class BookService {
  // signal() — reactive value; Angular tracks reads and re-renders consumers automatically
  private booksSignal = signal<Book[]>([...booksMock]);

  // asReadonly() — exposes the signal without allowing external .set() / .update() calls
  books = this.booksSignal.asReadonly();

  // computed() — derived value; recalculates automatically when booksSignal changes
  totalBooks = computed(() => this.booksSignal().length);

  // Singleton demo: this timestamp is the same across all components that inject this service
  readonly createdAt = new Date();

  getBookById(id: number): Book | undefined {
    return this.booksSignal().find(b => b.id === id);
  }

  addBook(book: Book): void {
    // update() receives the current value and returns the next value (immutable pattern)
    this.booksSignal.update(books => [...books, book]);
  }

  deleteBook(id: number): void {
    this.booksSignal.update(books => books.filter(b => b.id !== id));
  }

  // Generate a unique id based on the current max
  nextId(): number {
    return Math.max(...this.booksSignal().map(b => b.id)) + 1;
  }
}
