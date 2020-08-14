import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './book-list/filter/filter.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book-list/book/book.component';
import { BookStatusDirective } from './book-list/book/book-status.directive';
import { AddBookComponent } from './add-book/add-book.component';
import { BookService } from './services/book/book.service';
import { PayPalToken } from './services/injector-tokens';
import { PayPalConfig } from './models/PayPalConfig';
import { environment } from 'src/environments/environment';
import { LoggerService } from './services/logger/logger.service';
import { SilentLoggerService } from './services/silent-logger/silent-logger.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const payPalToken: PayPalConfig = {
  clientId: '12312qeqwe',
  secretId: '13123123asdasd',
  url: ''
};

const routes: Routes = [
  { path: 'list', component: BookListComponent },
  { path: 'add', component: AddBookComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AddBookComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,

    // Once use -> Core
    MenuComponent,
    HeaderComponent,

    // Book functionality (module)
    FilterComponent,
    BookListComponent,
    BookComponent,
    BookStatusDirective,
    AddBookComponent

    // Shared module
    // ButtonComponent for example
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),

    // Could be used in many places -> SharedModule
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    // Only used by Book feature as singleton -> BookModule
    BookService,

    // Used as singletons in many places -> CoreModule

    // {provide: BookService, useClass: BookService} // it is the same as before
    {provide: PayPalToken, useValue: payPalToken}, // {provide: 'PayPalToken', useValue: payPalToken} is similar but useless
    {provide: LoggerService, useFactory: () => {
      if (environment.production) {
        return new SilentLoggerService();
      }

      return new LoggerService();
    }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
