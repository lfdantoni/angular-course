import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
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
import { HttpClientModule } from '@angular/common/http';
import { BookListComponent } from './book-list/book-list.component';
import { BookStatusDirective } from './book-list/book/book-status.directive';
import { BookComponent } from './book-list/book/book.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const payPalToken: PayPalConfig = {
  clientId: '12312qeqwe',
  secretId: '13123123asdasd',
  url: ''
};

const routes: Routes = [
  {path: 'book-list', component: BookListComponent},
  {path: 'forms', component: FormsComponent, canActivate: [AuthGuard]},
  {path: 'data-binding', component: DataBindingComponent, canActivate: [AuthGuard]},
  {path: 'book-list/:category', component: BookListComponent},
  {path: '404', component: NotFoundComponent},
  {path: '', redirectTo: 'book-list', pathMatch: 'full'},
  {path: '**', redirectTo: '/404'}
]

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
    FilterComponent,
    BookListComponent,
    BookStatusDirective,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})
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
