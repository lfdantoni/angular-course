import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Book } from '../../models/book';
import { BookCategory } from '../../models/book-category';

@Injectable()
export class BooksService {
  private url = environment.API_URL + 'api/books';
  private urlCategory = environment.API_URL + 'api/categories';

  constructor(private httpClient: HttpClient) { }

  // getBookById(bookId: string): Book|undefined {
  //   return booksMock.find(book => book.id === bookId);
  // }

  // getBookById(bookId: string): Observable<Book|undefined> {
  //   return new Observable((observer: Observer<Book|undefined>) => {
  //     const book = booksMock.find(book => book.id === bookId);

  //     observer.next(book);
  //     console.log('getBookById')
  //     observer.next(book);
  //     console.log('getBookById2')
  //     observer.complete();
  //   })
  // }

  getBookById(bookId: string): Observable<Book> {
    return this.httpClient.get<Book>(`${this.url}/${bookId}`, {headers: this.headers});
  }

  // getBooks(): Observable<Book[]> {
  //   return new Observable((observer: Observer<Book[]>) => {
  //     observer.next(booksMock);
  //     observer.complete();
  //   })
  // }

  getBooks(): Observable<Book[]> {
    console.log(this.url)
    return this.httpClient.get<Book[]>(this.url, {headers: this.headers});
  }

  getBooksResponse(): Observable<HttpResponse<Book[]>> {
    return this.httpClient.get<Book[]>(this.url, {headers: this.headers, observe: 'response'});
  }

  getCategories(): Observable<BookCategory[]> {
    return this.httpClient.get<BookCategory[]>(this.urlCategory, {headers: this.headers});
  }

  saveNewBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.url, book, {headers: this.headers});
  }

  // getBooksByCategory(category: string): Observable<Book[]> {
  //   return new Observable((observer: Observer<Book[]>) => {
  //     const books = booksMock.filter(book => book.categories.includes(category))

  //     observer.next(books);
  //     observer.complete();
  //   })
  // }

  getBooksByCategory(category: string): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.url}?categories_like=${category}`, {headers: this.headers});
  }

  saveEditBook(bookId: string, book: Omit<Book, 'id'>): Observable<Book> {
    return this.httpClient.put<Book>(`${this.url}/${bookId}`, book, {headers: this.headers});
  }

  saveEditBookPartially(bookId: string, book: Partial<Omit<Book, 'id'>>): Observable<Book> {
    return this.httpClient.patch<Book>(`${this.url}/${bookId}`, book, {headers: this.headers});
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
