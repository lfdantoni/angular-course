import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BookList } from 'src/app/mock-data';

@Injectable()
export class BookService {

  constructor() { }

  getBooks(): Book[] {
    return BookList;
  }
}
