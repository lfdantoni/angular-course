import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BookList, CategoryList } from 'src/app/mock-data';
import { BookCategory } from 'src/app/models/BookCategory';

@Injectable()
export class BookService {

  constructor() { }

  getBooks(): Book[] {
    return BookList;
  }

  getCategories(): BookCategory[] {
    return CategoryList;
  }
}
