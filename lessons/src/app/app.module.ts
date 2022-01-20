import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { BookComponent } from './data-binding/book/book.component';
import { HighLightDirective } from './directives/high-light.directive';
import { TemplateDrivenFormComponent } from './forms/template-driven-form/template-driven-form.component';
import { FormsComponent } from './forms/forms.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';
import { BookService } from './services/book/book.service';
import { PayPalConfig } from './models/paypal-config';
import { PayPalToken } from './services/injector-tokens';
import { LoggerService } from './services/logger/logger.service';
import { environment } from 'src/environments/environment';
import { SilentLoggerService } from './services/silent-logger/silent-logger.service';
import { CategoryComponent } from './data-binding/category/category.component';
import { FilterComponent } from './data-binding/filter/filter.component';

const payPalToken: PayPalConfig = {
  clientId: '12312qeqwe',
  secretId: '13123123asdasd',
  url: ''
};

@NgModule({
  declarations: [
    AppComponent,
    DataBindingComponent,
    BookComponent,
    HighLightDirective,
    TemplateDrivenFormComponent,
    FormsComponent,
    ReactiveFormComponent,
    CategoryComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BookService,
    // {provide: BookService, useClass: BookService},  // Helpful to override logic with an inherited class
    {provide: PayPalToken, useValue: payPalToken},
    {provide: LoggerService, useFactory: () => {
      if(environment.production) {
        return new SilentLoggerService();
      }

      return new LoggerService()
    }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
