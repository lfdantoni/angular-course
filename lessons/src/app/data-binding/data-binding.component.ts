import { Component, Inject, Optional } from '@angular/core';
import { PayPalConfig } from '../models/paypal-config';
import { BookService } from '../services/book/book.service';
import { CartService } from '../services/cart/cart.service';
import { PayPalToken } from '../services/injector-tokens';
import { LoggerFormatService } from '../services/logger-format/logger-format.service';
import { LoggerService } from '../services/logger/logger.service';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css'],
  // providers:[LoggerFormatService]
})
export class DataBindingComponent {
  title: string = 'test title';
  inputValue: string = 'test input';
  greeting: string = '';

  list: string[] = ['hello', 'world', '!'];
  remove = false;

  constructor(
    private bookService: BookService,
    @Inject(PayPalToken) private paypalConfig: PayPalConfig,
    private logger: LoggerService,
    private cartService: CartService,
    // @Optional() params should be always at the final
    @Optional() private loggerFormatService: LoggerFormatService) { }

  onChange(target: EventTarget | null) {
    this.inputValue = target ? (target as HTMLInputElement).value : '';
  }

  sayHello() {
    this.greeting = 'Hello world!';
    console.log(this.bookService.getBooks())
    console.log(this.paypalConfig)
    this.logger.log('my value')
    this.loggerFormatService?.log('my value 2')

    this.cartService.addBook('my book')
  }

  onRemoveClick() {
    this.remove = true;
  }

  onAddText() {
    this.list.push(new Date().getTime().toString());
  }

  logValue(value: string) {
    console.log('Value:', value)
  }

}
