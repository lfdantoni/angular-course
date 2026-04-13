import { Component, computed, effect, Inject, OnDestroy, OnInit, Optional, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { LoggerService } from '../../services/logger.service';
import { APP_CONFIG, AppConfig } from '../../tokens/app-config.token';

@Component({
  selector: 'app-book-list',
  imports: [BookComponent, RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
// Constructor injection — the traditional approach, still valid (not deprecated).
// Each dependency is declared as a constructor parameter with an access modifier.
// With InjectionToken, @Inject() decorator is required to pass the token explicitly.
//
// export class BookListComponent implements OnInit, OnDestroy {
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     public bookService: BookService,
//     @Optional() private logger: LoggerService | null,
//     @Inject(APP_CONFIG) public appConfig: AppConfig,
//   ) {}
// }
//
// inject() is preferred in Angular 14+ because:
//   - works outside constructors (field initializers, guards, factories)
//   - less boilerplate, no need for @Inject() or @Optional() decorators
//   - options object: inject(LoggerService, { optional: true })
export class BookListComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  // public so the template can call bookService.totalBooks() directly —
  // demonstrates reading a computed() signal from a service in the template
  bookService = inject(BookService);

  // inject(LoggerService, { optional: true }) — if the provider is not registered,
  // Angular returns null instead of throwing. Useful for optional dependencies.
  private logger = inject(LoggerService, { optional: true });

  // inject(APP_CONFIG) — reads a non-class value registered via InjectionToken
  appConfig = inject(APP_CONFIG);

  cart: Book[] = [];

  // signal() — activeCategory is now reactive; setting it re-triggers computed() below
  activeCategory = signal('');

  // computed() — auto-recalculates whenever bookService.books() or activeCategory() changes.
  // This replaces the manual `this.books = ...` assignment inside the queryParams subscription.
  filteredBooks = computed(() => {
    const all = this.bookService.books();
    const cat = this.activeCategory();
    return cat ? all.filter(b => b.categories.includes(cat)) : all;
  });

  // computed() — categories list stays in sync with the book list automatically
  categories = computed(() =>
    [...new Set(this.bookService.books().flatMap(b => b.categories))].sort()
  );

  constructor() {
    // effect() — runs whenever any signal it reads changes; used for side effects.
    // Must be called in an injection context (constructor or field initializer).
    effect(() => {
      this.logger?.log(`Book list updated — total: ${this.bookService.totalBooks()}`);
    });
  }

  // ngOnInit: runs once after Angular initializes the component's inputs.
  // Correct place for: initial HTTP calls, initialization logic.
  // Do NOT put business logic in the constructor.
  ngOnInit(): void {
    this.logger?.log('BookListComponent initialized');

    // LocalStorage: restore cart from previous session
    const savedCart = localStorage.getItem('cart');
    this.cart = savedCart ? JSON.parse(savedCart) : [];

    // Read queryParams — e.g. /books?category=fiction (set from BookDetail or category filter).
    // Observable from the router; we bridge it to a signal by calling activeCategory.set().
    // filteredBooks (computed) re-runs automatically once activeCategory changes.
    this.route.queryParams.subscribe(params => {
      this.activeCategory.set(params['category'] ?? '');
    });
  }

  // ngOnDestroy: runs before the component is removed from the DOM.
  // Correct place for: cancelling subscriptions, clearing timers.
  ngOnDestroy(): void {
    this.logger?.log('BookListComponent destroyed');
  }

  addToCart(book: Book) {
    this.cart.push(book);
    // LocalStorage: persist cart across navigation
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }

  navigateToDetail(book: Book) {
    // Programmatic navigation — same as [routerLink]="['/books', book.id]" but triggered by output
    this.router.navigate(['/books', book.id]);
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(book.id);
  }
}
