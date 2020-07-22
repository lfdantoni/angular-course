import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BookComponent } from './data-binding/book/book.component';
import { HighLightDirective } from './directives/high-light.directive';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { FormsComponent } from './forms/forms.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';
import { TemplateDrivenFormComponent } from './forms/template-driven-form/template-driven-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    HighLightDirective,
    DataBindingComponent,
    FormsComponent,
    ReactiveFormComponent,
    TemplateDrivenFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // reactive forms
    FormsModule  // Template-Driven forms
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
