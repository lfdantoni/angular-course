import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { booksMock } from '../../mock-data/books';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  imports: [BookComponent, RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);

  books: Book[] = [];
  cart: Book[] = [];
  activeCategory: string = '';

  // ngOnInit: runs once after Angular initializes the component's inputs.
  // Correct place for: initial HTTP calls, initialization logic.
  // Do NOT put business logic in the constructor.
  ngOnInit(): void {
    console.log('BookListComponent initialized');

    // LocalStorage: restore cart from previous session
    const savedCart = localStorage.getItem('cart');
    this.cart = savedCart ? JSON.parse(savedCart) : [];

    // Read queryParams — e.g. /books?category=fiction (set from BookDetail)
    this.route.queryParams.subscribe(params => {
      this.activeCategory = params['category'] ?? '';
      this.books = this.activeCategory
        ? booksMock.filter(b => b.categories.includes(this.activeCategory))
        : booksMock;
    });
  }

  // ngOnDestroy: runs before the component is removed from the DOM.
  // Correct place for: cancelling subscriptions, clearing timers.
  ngOnDestroy(): void {
    console.log('BookListComponent destroyed');
  }

  addToCart(book: Book) {
    this.cart.push(book);
    // LocalStorage: persist cart across navigation
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log('Cart:', this.cart);
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }
}
