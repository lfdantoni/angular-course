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
import { PayPalConfig } from './models/paypal-config';
import { PayPalToken } from './services/injector-tokens';
import { LoggerService } from './services/logger/logger.service';
import { environment } from '../environments/environment';
import { SilentLoggerService } from './services/silent-logger/silent-logger.service';
import { LoggerFormatService } from './services/logger-format/logger-format.service';
import { CustomForbiddenValueValidatorAsyncDirective } from './directives/validators/custom-forbidden-value-validator-async.directive';
import { provideHttpClient } from '@angular/common/http';
import { PostComponent } from './post-list/post/post.component';
import { KebabCasePipe } from './pipes/kebabcase.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PostListComponent } from './post-list/post-list.component';

const payPalToken: PayPalConfig = {
  clientId: '12312qeqwe',
  secretId: '13123123asdasd',
  url: ''
};

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
    CustomForbiddenValueValidatorDirective,
    CustomForbiddenValueValidatorAsyncDirective,
    PostComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, // it is necessary to use the new Control Flow directive @ngFor, etc.
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    KebabCasePipe,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
  ],
  providers: [
    provideHttpClient(),
    // LoggerService,
    // { provide: LoggerService, useClass: LoggerFormatService },
    // { provide: LoggerService, useClass: SilentLoggerService },


    // LoggerFormatService,
    // { provide: LoggerService, useExisting: LoggerFormatService },


    {provide: PayPalToken, useValue: payPalToken},
    {provide: LoggerService, useFactory: () => {
      if(environment.production) {
        return new SilentLoggerService();
      }

      return new LoggerFormatService()
    }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
