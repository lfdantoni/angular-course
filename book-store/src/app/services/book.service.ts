import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Book } from '../models/book';
import { environment } from '../../environments/environment';

// ── Lesson 4 approach (Signals + in-memory mock) — replaced in lesson 5 by HttpClient ──
// import { signal, computed } from '@angular/core';
// import { booksMock } from '../mock-data/books';
//
// All methods were synchronous — no Observable, no HTTP, data lived in memory.
//
// private _books = signal<Book[]>([...booksMock]);
//
// // asReadonly(): exposes the signal without the write API
// // — components can read, not mutate directly
// readonly books = this._books.asReadonly();
//
// // computed(): derives a value from one or more signals; recalculates automatically
// readonly totalBooks = computed(() => this._books().length);
//
// getBooks(): Book[] { return this._books(); }
// getBookById(id: number): Book | undefined { return this._books().find(b => b.id === id); }
// addBook(book: Book): void { this._books.update(books => [...books, book]); }
// nextId(): number { return Math.max(0, ...this._books().map(b => b.id)) + 1; }
// ─────────────────────────────────────────────────────────────────────────────────────────

// Singleton demo: same createdAt seen across all components that inject this service
// @Injectable({ providedIn: 'root' }) — one instance for the entire app
@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);

  // Use apiUrl from environment — replaced by angular.json fileReplacements on ng build
  // Alternative: inject(API_URL) from an InjectionToken registered in app.config.ts
  private apiUrl = `${environment.apiUrl}/books`;

  readonly createdAt = new Date();

  // All HTTP methods return Observable<T> — lazy, only execute when subscribed.
  // pipe(catchError(...)) handles errors without breaking the stream.

  // category?: when provided, json-server v0.17 filters server-side via ?categories_like=.
  // _like performs a regex match on the field — works on array fields because json-server
  // matches against the JSON string representation of the value.
  // Omitting category returns all books.
  getBooks(category?: string): Observable<Book[]> {
    const url = category
      ? `${this.apiUrl}?categories_like=${encodeURIComponent(category)}`
      : this.apiUrl;
    return this.http.get<Book[]>(url).pipe(
      catchError(err => throwError(() =>
        new Error(`Could not load books (${err.status}). Is json-server running?`)
      ))
    );
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => throwError(() =>
        new Error(`Book ${id} not found (${err.status})`)
      ))
    );
  }

  createBook(book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book).pipe(
      catchError(err => throwError(() =>
        new Error(`Could not create book (${err.status})`)
      ))
    );
  }

  updateBook(id: number, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book).pipe(
      catchError(err => throwError(() =>
        new Error(`Could not update book ${id} (${err.status})`)
      ))
    );
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => throwError(() =>
        new Error(`Could not delete book ${id} (${err.status})`)
      ))
    );
  }

  getCategories(): Observable<string[]> {
    return this.http
      .get<{ id: number; name: string }[]>(`${environment.apiUrl}/categories`)
      .pipe(
        map(cats => cats.map(c => c.name)),
        catchError(() => throwError(() => new Error('Could not load categories')))
      );
  }
}
