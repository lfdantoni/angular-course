import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { BookComponent } from './data-binding/book/book.component';
import { HighLightDirective } from './directives/high-light.directive';

@NgModule({
  declarations: [
    AppComponent,
    DataBindingComponent,
    BookComponent,
    HighLightDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
