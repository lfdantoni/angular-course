import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  imports: [BookComponent, RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);

  books: Book[] = [];
  cart: Book[] = [];
  activeCategory: string = '';

  // Derive unique categories from the full book list in the service
  get categories(): string[] {
    return [...new Set(this.bookService.getBooks().flatMap(b => b.categories))].sort();
  }

  // ngOnInit: runs once after Angular initializes the component's inputs.
  // Correct place for: initial HTTP calls, initialization logic.
  // Do NOT put business logic in the constructor.
  ngOnInit(): void {
    console.log('BookListComponent initialized');

    // LocalStorage: restore cart from previous session
    const savedCart = localStorage.getItem('cart');
    this.cart = savedCart ? JSON.parse(savedCart) : [];

    // Read queryParams — e.g. /books?category=fiction (set from BookDetail or category filter)
    this.route.queryParams.subscribe(params => {
      this.activeCategory = params['category'] ?? '';
      const all = this.bookService.getBooks();
      this.books = this.activeCategory
        ? all.filter(b => b.categories.includes(this.activeCategory))
        : all;
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

  navigateToDetail(book: Book) {
    // Programmatic navigation — same as [routerLink]="['/books', book.id]" but triggered by output
    this.router.navigate(['/books', book.id]);
  }
}
