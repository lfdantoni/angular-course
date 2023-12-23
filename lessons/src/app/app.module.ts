import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { BookComponent } from './book-list/book/book.component';
import { HighLightDirective } from './directives/high-light.directive';
import { FormsComponent } from './forms/forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateDrivenFormComponent } from './forms/template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';
import { SharedModule } from './shared/shared.module';
import { BookListComponent } from './book-list/book-list.component';
import { ChildComponent } from './data-binding/child/child.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomForbiddenValueValidatorDirective } from './directives/validators/custom-forbidden-value-validator';
import { BookService } from './services/book/book.service';
import { PayPalToken } from './services/injector-tokens';
import { PayPalConfig } from './models/paypal-config';
import { LoggerService } from './services/logger/logger.service';
import { environment } from '../environments/environment';
import { SilentLoggerService } from './services/silent-logger/silent-logger.service';

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
    FormsComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    ChildComponent,
    HighLightDirective,
    BookListComponent,
    NotFoundComponent,
    CustomForbiddenValueValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    BookService,
    // {provide: BookService, useClass: BookService},  // Helpful to override logic with an inherited class
    {provide: PayPalToken, useValue: payPalToken},
    {provide: LoggerService, useFactory: () => {
      if(environment.isProd) {
        return new SilentLoggerService();
      }

      return new LoggerService()
    }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
