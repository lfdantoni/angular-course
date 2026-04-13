import { Component, DestroyRef, Inject, inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// AsyncPipe import removed in lesson 6 — toSignal() replaces the (vm$ | async) pattern.
// import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, catchError, forkJoin, map, of, shareReplay, switchMap } from 'rxjs';
import { BookComponent } from '../book/book.component';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { LoggerService } from '../../services/logger.service';
import { APP_CONFIG, AppConfig } from '../../tokens/app-config.token';

// ── Lesson 4 approach (Signals) — replaced in lesson 5 by vm$ Observable + async pipe ──
// import { signal, computed, effect } from '@angular/core';
//
// Books and derived state lived in reactive signals — no Observable, no async pipe needed.
//
// books = this.bookService.books; // ReadonlySignal<Book[]> from the service
// activeCategory = signal('');    // writable signal updated from queryParams
//
// // computed(): recalculates whenever a read signal changes
// filteredBooks = computed(() => {
//   const cat = this.activeCategory();
//   return cat ? this.books().filter(b => b.categories.includes(cat)) : this.books();
// });
//
// categories = computed(() =>
//   [...new Set(this.books().flatMap(b => b.categories))].sort()
// );
//
// // effect(): runs a side effect whenever read signals change — auto-cleans on destroy
// _ = effect(() => this.logger?.log(`Showing ${this.filteredBooks().length} books`));
//
// In ngOnInit, queryParams updated the signal:
//   this.route.queryParams.subscribe(params =>
//     this.activeCategory.set(params['category'] ?? '')
//   );
//
// In the template: filteredBooks(), categories(), activeCategory() — no async pipe needed.
// ─────────────────────────────────────────────────────────────────────────────────────────

// View model — the shape of the data resolved and passed to the template
interface BookListVm {
  books: Book[];
  categories: string[];
  activeCategory: string;
  total: number;
}

@Component({
  selector: 'app-book-list',
  // AsyncPipe was here in lesson 5 for the (vm$ | async) pattern — removed in lesson 6.
  // toSignal() reads the signal directly in the template with vm() — no pipe needed.
  imports: [BookComponent, RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  private destroyRef = inject(DestroyRef);

  // inject(LoggerService, { optional: true }) — null if the provider is not registered
  private logger = inject(LoggerService, { optional: true });

  // inject(APP_CONFIG) — reads a value registered via InjectionToken
  appConfig = inject(APP_CONFIG);

  // Constructor injection alternative (commented reference):
  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private bookService: BookService,
  //   @Optional() private logger: LoggerService | null,
  //   @Inject(APP_CONFIG) public appConfig: AppConfig,
  // ) {}

  cart: Book[] = [];
  isLoading = true;
  error = '';

  // BehaviorSubject used as a manual refresh trigger.
  // Emitting a new value causes vm$ to re-fetch books from the server.
  private refresh$ = new BehaviorSubject<void>(undefined);

  // shareReplay(1): categories are fetched once on first subscription.
  // Every subsequent subscriber (including after filter changes or refresh) gets
  // the cached result immediately — no new HTTP request is made.
  // Categories don't change when the user switches filters, so re-fetching is wasteful.
  private categories$ = this.bookService.getCategories().pipe(
    shareReplay(1)
  );

  // vm$ — the main Observable for this component.
  // switchMap cancels any in-flight request when queryParams or refresh$ changes.
  vm$ = this.refresh$.pipe(
    switchMap(() => this.route.queryParams),
    switchMap(params => {
      const category = params['category'] ?? '';
      this.isLoading = true;
      this.error = '';

      // forkJoin: waits for ALL inner observables to complete, then emits one combined value.
      // Equivalent to Promise.all() — ideal when requests are independent.
      return forkJoin({
        // Server-side filter: GET /books?categories_like=fiction
        // json-server v0.17 regex-matches the query value against the field — works on arrays.
        books: this.bookService.getBooks(category || undefined),
        // categories$ replays the cached value — no new HTTP request on filter change or refresh.
        categories: this.categories$,
      }).pipe(
        map(({ books, categories }): BookListVm => ({
          books,
          categories,
          activeCategory: category,
          total: books.length,
        }))
      );
    }),
    // tap() could be used here for side effects without altering the stream:
    // tap(() => this.isLoading = false)
    catchError(err => {
      this.isLoading = false;
      this.error = err.message;
      return of(null); // emit null so the stream doesn't terminate
    }),
    map(vm => { this.isLoading = false; return vm; })
  );

  // ── Lesson 5 approach (async pipe in template) — replaced in lesson 6 by toSignal() ──
  // The template used: @if (vm$ | async; as vm) { ... }
  // async pipe subscribes/unsubscribes automatically but requires AsyncPipe in imports.
  // ────────────────────────────────────────────────────────────────────────────────────────

  // toSignal(): bridges Observable → Signal.
  // Subscribes to vm$ internally and exposes the latest value as a readable signal.
  // - No need for async pipe in the template — read with vm()
  // - Automatically unsubscribes when the component is destroyed
  // - initialValue: null represents "not yet loaded" (same as async pipe before first emission)
  // Must be called in an injection context (class field initialization qualifies).
  vm = toSignal(this.vm$, { initialValue: null });

  // ngOnInit: runs once after Angular initializes the component's inputs.
  // Correct place for: initial HTTP calls, initialization logic.
  // Do NOT put business logic in the constructor.
  ngOnInit(): void {
    this.logger?.log('BookListComponent initialized');

    // LocalStorage: restore cart from previous session
    const savedCart = localStorage.getItem('cart');
    this.cart = savedCart ? JSON.parse(savedCart) : [];
  }

  // ngOnDestroy: runs before the component is removed from the DOM.
  // Correct place for: cancelling subscriptions, clearing timers.
  // Note: vm is managed by toSignal() — no manual unsubscribe needed.
  ngOnDestroy(): void {
    this.logger?.log('BookListComponent destroyed');
  }

  addToCart(book: Book): void {
    this.cart.push(book);
    // LocalStorage: persist cart across navigation
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart(): void {
    this.cart = [];
    localStorage.removeItem('cart');
  }

  navigateToDetail(book: Book): void {
    // Programmatic navigation — same as [routerLink]="['/books', book.id]" but triggered by output
    this.router.navigate(['/books', book.id]);
  }

  deleteBook(book: Book): void {
    // takeUntilDestroyed(destroyRef) — cancels this subscription when the component is destroyed.
    // Modern replacement for storing a Subscription and calling unsubscribe() in ngOnDestroy.
    // Must use destroyRef explicitly when called outside the constructor.
    this.bookService.deleteBook(book.id).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => this.refresh$.next(), // re-trigger vm$ to reload from server
      error: err => { this.error = err.message; },
    });
  }
}
