import { Component, OnDestroy, OnInit } from '@angular/core';
import { booksMock } from '../../mock-data/books';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  cart: Book[] = [];

  ngOnInit(): void {
    console.log('BookListComponent initialized');
    this.books = booksMock;
  }

  ngOnDestroy(): void {
    console.log('BookListComponent destroyed');
  }

  addToCart(book: Book) {
    this.cart.push(book);
    console.log('Cart:', this.cart);
  }
}
