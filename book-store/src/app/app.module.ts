import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book-list/book/book.component';
import { BookStatusDirective } from './book-list/book/book-status.directive';
import { BookService } from './services/book/book.service';
import { PayPalToken } from './services/injector-token';
import { PayPalConfig } from './models/PayPalConfig';
import { LoggerService } from './services/logger/logger.service';
import { environment } from 'src/environments/environment';
import { SilentLoggerService } from './services/silent-logger/silent-logger.service';


const payPalToken: PayPalConfig = {
  clientId: '12312qeqwe',
  secretId: '13123123asdasd',
  url: ''
};

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    BookListComponent,
    BookComponent,
    BookStatusDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    BookService,
    // {provide: BookService, useClass: BookService}, // Helpful to override logic with an inherited class
    {provide: PayPalToken, useValue: payPalToken},
    {provide: LoggerService, useFactory: () => {
      if(environment.production) {
        return new SilentLoggerService();
      }

      return new LoggerService();
    }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
