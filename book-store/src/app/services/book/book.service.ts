import { Injectable } from '@angular/core';
import { BookList } from 'src/app/mock-data';
import { Book } from 'src/app/models/Book';

@Injectable()
export class BookService {

  constructor() { }

  getBooks(): Book[] {
    return BookList;
  }
}
