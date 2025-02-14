import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { HighLightDirective } from './directives/high-light.directive';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book-list/book/book.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsComponent } from './forms/forms.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';
import { TemplateDrivenFormComponent } from './forms/template-driven-form/template-driven-form.component';
import { CustomForbiddenValueValidatorDirective } from './directives/validators/custom-forbidden-value-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    DataBindingComponent,
    HighLightDirective,
    BookListComponent,
    BookComponent,
    NotFoundComponent,
    FormsComponent,
    ReactiveFormComponent,
    TemplateDrivenFormComponent,
    CustomForbiddenValueValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, // it is necessary to use the new Control Flow directive @ngFor, etc.
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
