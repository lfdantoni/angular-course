import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, combineLatest, takeWhile, Observable } from 'rxjs';
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
  bookListObs: Observable<Book[]> = this.bookService.getBooks();
  card: Book[] = [];
  // getBookIdSubscription?: Subscription;
  isBooksLoading = false;
  alive = true;

  constructor(
    private activateRoute: ActivatedRoute,
    private bookService: BookService,
    private logger: LoggerService,
    @Inject(PayPalToken) private paypalConfig: PayPalConfig,
    // @Optional() params should be always at the final
    @Optional() private loggerFormatService?: LoggerFormatService
    ) { }


  ngOnInit(): void {
    // console.log('params', this.activateRoute.snapshot.params)
    // console.log('queryParams', this.activateRoute.snapshot.queryParams)
    // const id: string = this.activateRoute.snapshot.params['id'];
    // const category: string = this.activateRoute.snapshot.queryParams['category'];

    // console.log('paypalConfig', this.paypalConfig)
    // console.log('optional logger format service', this.loggerFormatService)

    // Be aware that combineLatest will not emit an initial value until each observable emits at least one value.
    // https://www.learnrxjs.io/learn-rxjs/operators/combination/combinelatest
    combineLatest([
      this.activateRoute.params,
      this.activateRoute.queryParams
    ])
    .pipe(takeWhile(() => this.alive))
    .subscribe(([params, queryParams]) => {
      const id = params['id'];

      if(id) {
        this.isBooksLoading = true;

        // this.getBookIdSubscription = this.bookService.getBookById(id)
        // this.bookService.getBookById(id)
        //   .pipe(takeWhile(() => this.alive))
        //   .subscribe((book: Book|undefined) => {
        //     this.bookList = book ? [book] : []
        //     this.isBooksLoading = false;
        //   })

        this.bookService.getBookById(id)
          .pipe(takeWhile(() => this.alive))
          .subscribe({
            next: (book: Book|undefined) => {
              this.bookList = book ? [book] : []
              this.isBooksLoading = false;
            },
            error: error => console.log('ERROR!', error),
            complete: () => console.log('Execution complete!'), // no error and there is no next values (next method wont be called anymore)
          })

        return;
      }

      const category = queryParams['category'];

      if(category) {
        this.isBooksLoading = true;

        this.bookService.getBooksByCategory(category)
          .pipe(takeWhile(() => this.alive))
          .subscribe((books: Book[]) => {
            this.bookList = books;
            this.isBooksLoading = false;
          })

        return;
      }

      this.isBooksLoading = true;

      this.bookService.getBooks()
        .pipe(takeWhile(() => this.alive))
        .subscribe(books => {
          this.bookList = books;
          this.isBooksLoading = false;
        })
    })

    // this.activateRoute.params
    //   .subscribe((params: Params) => {
    //     const id = params['id'];

    //     if(id) {
    //       this.getBookIdSubscription = this.bookService.getBookById(id)
    //       .subscribe((book: Book|undefined) => {
    //         this.bookList = book ? [book] : []
    //       })

    //       return;
    //     }
    //   })


    // this.activateRoute.queryParams
    //   .subscribe((queryParams: Params) => {
    //     const category = queryParams['category'];

    //     if(category) {
    //       this.bookService.getBooksByCategory(category)
    //         .subscribe((books: Book[]) => {
    //           this.bookList = books;
    //         })

    //       return;
    //     }
    //   })


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

    this.bookService.getBooksResponse()
    .pipe(takeWhile(() => this.alive))
    .subscribe(resp => {
      console.log('getBooksResponse', resp)

      const keys = resp.headers.keys()
      console.log('getBooksResponse keys', keys)

      const headers = keys.map(key => {
        return `${key}: ${resp.headers.get(key)}`
      })

      console.log('getBooksResponse headers', headers)
    })
  }

  ngOnDestroy(): void {
    // this.getBookIdSubscription?.unsubscribe();
    this.alive = false;
  }

  addBookToCart(book: Book) {
    console.log('addBookToCart', book)
    this.card.push(book)
    console.log('card', this.card)
  }
}
