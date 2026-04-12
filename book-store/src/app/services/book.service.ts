import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { booksMock } from '../mock-data/books';

// @Injectable({ providedIn: 'root' }) — registers this service as a singleton
// available anywhere in the app without needing to add it to a providers array.
// Angular's DI creates one instance and reuses it across all components.
@Injectable({ providedIn: 'root' })
export class BookService {
  // Private mutable list — components interact through the public API below
  private books: Book[] = [...booksMock];

  getBooks(): Book[] {
    return this.books;
  }

  getBookById(id: number): Book | undefined {
    return this.books.find(b => b.id === id);
  }

  addBook(book: Book): void {
    this.books.push(book);
  }

  // Generate a unique id based on the current max — provisional until HTTP/backend exists
  nextId(): number {
    return Math.max(...this.books.map(b => b.id)) + 1;
  }
}
