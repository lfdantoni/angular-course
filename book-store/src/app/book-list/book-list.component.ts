import { Component, OnInit } from '@angular/core';
import { BookList } from '../mock-data';
import { Book } from '../models/Book';
import { CartManualService } from '../services/CartManualService';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  cartManualService: CartManualService;

  constructor() {
    this.books = BookList;

    this.cartManualService = new CartManualService();
  }

  ngOnInit(): void {
  }

  addBookToCart(book: Book): void {
    console.log('BookListComponent addCartBook: ', book);
  }
}
