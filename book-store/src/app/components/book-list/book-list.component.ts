import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { booksMock } from '../../mock-data/books';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  imports: [BookComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  cart: Book[] = [];

  // ngOnInit: runs once after Angular initializes the component's inputs.
  // Correct place for: initial HTTP calls, initialization logic.
  // Do NOT put business logic in the constructor.
  ngOnInit(): void {
    console.log('BookListComponent initialized');
    this.books = booksMock;
  }

  // ngOnDestroy: runs before the component is removed from the DOM.
  // Correct place for: cancelling subscriptions, clearing timers.
  ngOnDestroy(): void {
    console.log('BookListComponent destroyed');
  }

  addToCart(book: Book) {
    this.cart.push(book);
    console.log('Cart:', this.cart);
  }
}
