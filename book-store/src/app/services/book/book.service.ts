import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BookCategory } from 'src/app/models/BookCategory';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookService {
  private url = environment.API_URL + 'books';
  private urlCategory = environment.API_URL + 'categories';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }

  getCategories(): Observable<BookCategory[]> {
    return this.http.get<BookCategory[]>(this.urlCategory);
  }

  saveNewBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.url, book);
  }

  saveEditBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.url}/${book.id}`, book);
  }

  deleteBook(bookId: string): Observable<Book> {
    return this.http.delete<Book>(`${this.url}/${bookId}`);
  }
}
