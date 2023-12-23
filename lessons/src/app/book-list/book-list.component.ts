import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { booksMock } from '../mock-data/books';
import { Book } from '../models/book';
import { PayPalConfig } from '../models/paypal-config';
import { BookService } from '../services/book/book.service';
import { PayPalToken } from '../services/injector-tokens';
import { LoggerFormatService } from '../services/logger-format/logger-format.service';
import { LoggerService } from '../services/logger/logger.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  providers:[
    // { provide: LoggerService, useClass: LoggerFormatService },
    // LoggerFormatService,
  ]
  // providers:[{
  //   provide: LoggerService, useClass: LoggerFormatService
  // }]
})
export class BookListComponent implements OnInit, OnDestroy {
  // bookList: Book[] = booksMock;
  bookList: Book[] = [];
  card: Book[] = [];
  getBookIdSubscription?: Subscription;

  constructor(
    private activateRoute: ActivatedRoute,
    private bookService: BookService,
    private logger: LoggerService,
    @Inject(PayPalToken) private paypalConfig: PayPalConfig,
    // @Optional() params should be always at the final
    @Optional() private loggerFormatService?: LoggerFormatService
    ) { }


  ngOnInit(): void {
    console.log('params', this.activateRoute.snapshot.params)
    console.log('queryParams', this.activateRoute.snapshot.queryParams)
    // const id: string = this.activateRoute.snapshot.params['id'];
    // const category: string = this.activateRoute.snapshot.queryParams['category'];

    console.log('paypalConfig', this.paypalConfig)
    console.log('optional logger format service', this.loggerFormatService)


    this.activateRoute.params
      .subscribe((params: Params) => {
        const id = params['id'];

        if(id) {
          this.getBookIdSubscription = this.bookService.getBookById(id)
          .subscribe((book: Book|undefined) => {
            this.bookList = book ? [book] : []
          })

          return;
        }
      })


    this.activateRoute.queryParams
      .subscribe((queryParams: Params) => {
        const category = queryParams['category'];

        if(category) {
          this.bookService.getBooksByCategory(category)
            .subscribe((books: Book[]) => {
              this.bookList = books;
            })

          return;
        }
      })

    // if(id) {
      // const book = booksMock.find(book => book.id === id);
      // this.bookList = book ? [book] : []
      // return;

      // const book = this.bookService.getBookById(id)
      // this.bookList = book ? [book] : []
      // return;

      // this.getBookIdSubscription = this.bookService.getBookById(id)
      //   .subscribe(book => {
      //     this.logger.log('book by id' + book?.id)
      //     this.bookList = book ? [book] : []
      //   })

      // return;
    // }

    // if(category) {
      // this.bookList = booksMock.filter(book => book.categories.includes(category))
      // return;

    //   this.bookService.getBooksByCategory(category)
    //   .subscribe(books => {
    //     this.logger.log('books by category' + books.length)
    //     this.bookList = books;
    //   })

    //   return;
    // }

    // this.bookService.getBooks()
    //   .subscribe(books => {
    //     this.bookList = books;
    //   })
  }

  ngOnDestroy(): void {
    this.getBookIdSubscription?.unsubscribe();
  }

  addBookToCart(book: Book) {
    console.log('addBookToCart', book)
    this.card.push(book)
    console.log('card', this.card)
  }
}
