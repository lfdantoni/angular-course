import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './services/logger/logger.service';
import { SilentLoggerService } from './services/silent-logger/silent-logger.service';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { PayPalConfig } from './models/PayPalConfig';
import { PayPalToken } from './services/injector-tokens';
import { SharedModule } from '../shared/shared.module';


const payPalToken: PayPalConfig = {
  clientId: '12312qeqwe',
  secretId: '13123123asdasd',
  url: ''
};


@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent
  ],
  providers: [
    // {provide: BookService, useClass: BookService} // it is the same as before
    {provide: PayPalToken, useValue: payPalToken}, // {provide: 'PayPalToken', useValue: payPalToken} is similar but useless
    {provide: LoggerService, useFactory: () => {
      if (environment.production) {
        return new SilentLoggerService();
      }

      return new LoggerService();
    }}
  ]
})
export class CoreModule { }
