import { Component, Inject, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { booksMock } from '../mock-data/books';
import { Book } from '../models/book';
import { LoggerService } from '../services/logger/logger.service';
import { PayPalConfig } from '../models/paypal-config';
import { LoggerFormatService } from '../services/logger-format/logger-format.service';
import { PayPalToken } from '../services/injector-tokens';

@Component({
  selector: 'app-book-list',
  standalone: false,

  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  // compare this provider with the one in app.component.ts
  providers: [LoggerService]
})
export class BookListComponent {
  bookList: Book[] = booksMock;
  card: Book[] = [];

  constructor(private activateRoute: ActivatedRoute,
    private logger: LoggerService,
    @Inject(PayPalToken) private paypalConfig: PayPalConfig,
    // @Optional() params should be always at the final
    @Optional() private loggerFormatService?: LoggerFormatService) { }

  ngOnInit(): void {
    console.log('params', this.activateRoute.snapshot.params)
    console.log('queryParams', this.activateRoute.snapshot.queryParams)
    const category: string = this.activateRoute.snapshot.params['category'];

    if(category) {
      this.bookList = booksMock.filter(book => book.categories.includes(category))
    }

    this.logger.log('BookListComponent initialized hola');
    console.log('paypalConfig', this.paypalConfig);
    console.log('optional logger format service', this.loggerFormatService);
  }

  addBookToCart(book: Book) {
    console.log('addBookToCart', book)
    this.card.push(book)
    console.log('card', this.card)
  }
}
