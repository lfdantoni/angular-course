import { Injectable } from '@angular/core';
import { BookList, CategoryList } from 'src/app/mock-data';
import { Book } from 'src/app/models/Book';
import { BookCategory } from 'src/app/models/BookCategory';

@Injectable()
export class BookService {
  private bookList: Book[];

  constructor() {
    this.bookList = BookList;
   }

  getBooks(): Book[] {
    return this.bookList;
  }

  addBook(book: Book) {
    this.bookList.push(book);
  }

  getCategories(): BookCategory[] {
    return CategoryList;
  }
}
