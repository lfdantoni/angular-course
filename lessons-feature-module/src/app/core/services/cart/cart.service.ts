import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private books: string[] = []

  constructor() { }

  addBook(book: string) {
    this.books.push(book)
  }

  getBooks() {
    return this.books
  }
}
