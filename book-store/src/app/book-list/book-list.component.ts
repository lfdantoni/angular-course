import { Component, OnInit, Optional } from '@angular/core';
import {CartService} from '../services/cart/cart.service';
import { BookCategory } from '../models/BookCategory';
import { CartSummarize } from '../models/CartSummarize';
import { Book } from '../models/Book';
import { BookService } from '../services/book/book.service';
import { LoggerService } from '../services/logger/logger.service';
import { LoggerFormatService } from '../services/logger-format/logger-format.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [LoggerFormatService]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private cartService: CartService,
    private bookService: BookService,
    private logger: LoggerService,
    @Optional() private loggerFormat: LoggerFormatService) {

    this.books = this.bookService.getBooks();

    this.logger.log('BookListComponent log');

    if (this.loggerFormat) {
      this.loggerFormat.log('BookListComponent log');
    }
  }

  ngOnInit(): void {
  }

  addBookToCart(book: Book): void {
    console.log('BookListComponent addCartBook: ', book);
    this.cartService.addBook(book);
  }

  get categories(): BookCategory[] {
    return this.bookService.getCategories();
  }

  get cartSummarize(): CartSummarize {
    return this.cartService.getSummarize();
  }

}
