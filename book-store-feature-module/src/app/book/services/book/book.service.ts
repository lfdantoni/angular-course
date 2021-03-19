import { Injectable } from '@angular/core';
import { Book } from 'src/app/book/models/Book';
import { BookCategory } from '../../models/BookCategory';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookService {
  private url = environment.API_URL + 'books';
  private urlCategory = environment.API_URL + 'categories';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url, {headers: this.headers});
  }

  getCategories(): Observable<BookCategory[]> {
    return this.http.get<BookCategory[]>(this.urlCategory, {headers: this.headers});
  }

  saveNewBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.url, book, {headers: this.headers});
  }

  saveEditBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.url}/${book.id}`, book, {headers: this.headers});
  }

  deleteBook(bookId: string): Observable<Book> {
    return this.http.delete<Book>(`${this.url}/${bookId}`);
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.url}/${bookId}`);
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
}
