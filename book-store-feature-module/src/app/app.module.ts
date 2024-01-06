import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { BooksModule } from './books/books.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // BooksModule, // <-- uncomment this line if you dont want to use lazy loading, the order is IMPORTANT, if AppRoutingModule has a redirect to BooksModule routes, BooksModule should be loaded before
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
