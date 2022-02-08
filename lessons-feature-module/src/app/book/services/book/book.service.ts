import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { BookCategory } from '../../models/book-category';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookService {
  private url = environment.API_URL + 'books';
  private urlCategory = environment.API_URL + 'categories';

  constructor(private httpClient: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.url, {headers: this.headers});
  }

  getBooksByCategory(categoryCode: string): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.url}?categories_like=${categoryCode}`, { headers: this.headers })
  }

  getCategories(): Observable<BookCategory[]> {
    return this.httpClient.get<BookCategory[]>(this.urlCategory, {headers: this.headers});
  }

  saveNewBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.url, book, {headers: this.headers});
  }

  saveEditBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.url}/${book.id}`, book, {headers: this.headers});
  }

  deleteBook(bookId: string): Observable<Book> {
    return this.httpClient.delete<Book>(`${this.url}/${bookId}`);
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
}
