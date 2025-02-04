import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { BookComponent } from './data-binding/book/book.component';
import { HighLightDirective } from './directives/high-light.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DataBindingComponent,
    BookComponent,
    HighLightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, // it is necessary to use the new Control Flow directive @ngFor, etc.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
