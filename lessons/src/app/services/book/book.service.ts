import { Injectable } from '@angular/core';

@Injectable()
export class BookService {

  constructor() { }

  getBooks() {
    return Array(9).fill(0).map((_: number, index: number) => `book${index}`)
  }
}
