import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { booksMock } from '../../mock-data/books';
import { Book } from '../../models/book';

@Injectable()
export class BookService {

  constructor() { }

  // getBookById(bookId: string): Book|undefined {
  //   return booksMock.find(book => book.id === bookId);
  // }

  getBookById(bookId: string): Observable<Book|undefined> {
    return new Observable((observer: Observer<Book|undefined>) => {
      const book = booksMock.find(book => book.id === bookId);

      observer.next(book);
      console.log('getBookById')
      observer.next(book);
      console.log('getBookById2')
      observer.complete();
    })
  }

  getBooks(): Observable<Book[]> {
    return new Observable((observer: Observer<Book[]>) => {
      observer.next(booksMock);
      observer.complete();
    })
  }

  getBooksByCategory(category: string): Observable<Book[]> {
    return new Observable((observer: Observer<Book[]>) => {
      const books = booksMock.filter(book => book.categories.includes(category))

      observer.next(books);
      observer.complete();
    })
  }
}
