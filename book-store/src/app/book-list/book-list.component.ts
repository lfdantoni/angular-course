import { Component, Inject, Injector, OnDestroy, OnInit, Optional } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
// import { BookList } from '../mock-data';
import { Book } from '../models/Book';
import { PayPalConfig } from '../models/PayPalConfig';
import { BookService } from '../services/book/book.service';
import { CartService } from '../services/cart/cart.service';
import { CartManualService } from '../services/CartManualService';
import { PayPalToken } from '../services/injector-token';
import { LoggerFormatService } from '../services/logger-format/logger-format.service';
import { LoggerService } from '../services/logger/logger.service';
import { first } from 'rxjs/operators';
import { BookCategory } from '../models/BookCategory';
import { CartSummarize } from '../models/CartSummarize';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [LoggerFormatService]
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  categories: BookCategory[] = [];
  isLoading = true;
  bookSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private bookService: BookService,
    // @Inject(PayPalToken) private paypalConfig: PayPalConfig,
    private loggerService: LoggerService,
    private injector: Injector,
    @Optional() private loggerFormat: LoggerFormatService,
    ) {
    // this.books = BookList;



    // this.cartManualService = new CartManualService();

    // this.books = this.bookService.getBooks();
    // console.log(this.paypalConfig);

    this.loggerService.log('test!');

    if(this.loggerFormat) {
      this.loggerFormat.log('test2!');
    }

    console.log('CartService compare:', this.injector.get(CartService) === this.cartService); // the same service instance

  }

  ngOnInit(): void {
    // this.bookSubscription = this.bookService.getBooks()
    //   .subscribe(books => {
    //     this.books = books;
    //   });

    // this.bookService.getBooks()
    //   .pipe(first())
    //   .subscribe(books => {
    //     this.books = books;
    //   });

    // this.bookService.getCategories()
    //   .pipe(first())
    //   .subscribe(data => {
    //     this.categories = data;
    //   });

    forkJoin([
      this.bookService.getBooks(),
      this.bookService.getCategories()
    ])
    .pipe(first())
    .subscribe(([books, categories]) => {
      this.books = books;
      this.categories = categories;

      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if(this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
  }

  addBookToCart(book: Book): void {
    console.log('BookListComponent addCartBook: ', book);

    this.cartService.addBook(book);
  }

  get cartSummarize(): CartSummarize {
    return this.cartService.getSummarize();
  }
}
