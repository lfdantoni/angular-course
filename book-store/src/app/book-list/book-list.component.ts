import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
// import { BookList } from '../mock-data';
import { Book } from '../models/Book';
import { PayPalConfig } from '../models/PayPalConfig';
import { BookService } from '../services/book/book.service';
import { CartService } from '../services/cart/cart.service';
import { CartManualService } from '../services/CartManualService';
import { PayPalToken } from '../services/injector-token';
import { LoggerFormatService } from '../services/logger-format/logger-format.service';
import { LoggerService } from '../services/logger/logger.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [LoggerFormatService]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  cartManualService: CartManualService;

  constructor(
    private cartSummarize: CartService,
    private bookService: BookService,
    // @Inject(PayPalToken) private paypalConfig: PayPalConfig,
    private loggerService: LoggerService,
    private injector: Injector,
    @Optional() private loggerFormat: LoggerFormatService,
    ) {
    // this.books = BookList;



    this.cartManualService = new CartManualService();

    this.books = this.bookService.getBooks();
    // console.log(this.paypalConfig);

    this.loggerService.log('test!');

    if(this.loggerFormat) {
      this.loggerFormat.log('test2!');
    }

    console.log('CartService compare:', this.injector.get(CartService) === this.cartSummarize); // the same service instance

  }

  ngOnInit(): void {
  }

  addBookToCart(book: Book): void {
    console.log('BookListComponent addCartBook: ', book);

    this.cartSummarize.addBook(book);
  }
}
