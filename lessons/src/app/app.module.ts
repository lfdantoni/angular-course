import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { BookComponent } from './book-list/book/book.component';
import { HighLightDirective } from './directives/high-light.directive';
import { SharedModule } from './shared/shared.module';
import { BookListComponent } from './book-list/book-list.component';
import { ChildComponent } from './data-binding/child/child.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DataBindingComponent,
    BookComponent,
    ChildComponent,
    HighLightDirective,
    BookListComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
