import { Component, OnInit, Optional, OnDestroy } from '@angular/core';
import {CartService} from '../services/cart/cart.service';
import { BookCategory } from '../models/BookCategory';
import { CartSummarize } from '../models/CartSummarize';
import { Book } from '../models/Book';
import { BookService } from '../services/book/book.service';
import { LoggerService } from '../services/logger/logger.service';
import { LoggerFormatService } from '../services/logger-format/logger-format.service';
import { Subscription, forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';

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
    private logger: LoggerService,
    @Optional() private loggerFormat: LoggerFormatService) {

    // this.books = this.bookService.getBooks();

    this.logger.log('BookListComponent log');

    if (this.loggerFormat) {
      this.loggerFormat.log('BookListComponent log');
    }
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
    if (this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
  }

  addBookToCart(book: Book): void {
    console.log('BookListComponent addCartBook: ', book);
    this.cartService.addBook(book);
  }

  // get categories(): BookCategory[] {
  //   return this.bookService.getCategories();
  // }

  get cartSummarize(): CartSummarize {
    return this.cartService.getSummarize();
  }

}
