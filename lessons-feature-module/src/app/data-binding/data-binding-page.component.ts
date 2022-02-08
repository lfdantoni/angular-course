import { Component, Inject, Optional } from '@angular/core';
import { BookService } from '../book/services/book/book.service';
import { PayPalConfig } from '../core/models/paypal-config';
import { CartService } from '../core/services/cart/cart.service';
import { PayPalToken } from '../core/services/injector-tokens';
import { LoggerFormatService } from '../core/services/logger-format/logger-format.service';
import { LoggerService } from '../core/services/logger/logger.service';

@Component({
  selector: 'app-data-binding-page',
  templateUrl: './data-binding-page.component.html',
  styleUrls: ['./data-binding-page.component.css'],
  // providers:[LoggerFormatService]
})
export class DataBindingPageComponent {
  title: string = 'test title';
  inputValue: string = 'test input';
  greeting: string = '';

  list: string[] = ['hello', 'world', '!'];
  remove = false;

  constructor(
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
