import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/Book';
// import { BookList, CategoryList } from 'src/app/mock-data';
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
    // BookList;
  }

  getCategories(): Observable<BookCategory[]> {
    return this.http.get<BookCategory[]>(this.urlCategory);
    // CategoryList;
  }
}
