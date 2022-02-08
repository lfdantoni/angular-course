import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { PayPalToken } from './services/injector-tokens';
import { LoggerService } from './services/logger/logger.service';
import { environment } from 'src/environments/environment';
import { SilentLoggerService } from './services/silent-logger/silent-logger.service';
import { PayPalConfig } from './models/paypal-config';
import { MenuComponent } from './components/menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

const payPalToken: PayPalConfig = {
  clientId: '12312qeqwe',
  secretId: '13123123asdasd',
  url: ''
};

@NgModule({
  declarations: [
    NotFoundComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    NotFoundComponent,
    MenuComponent
  ],
  providers: [
    {provide: PayPalToken, useValue: payPalToken},
    {provide: LoggerService, useFactory: () => {
      if(environment.production) {
        return new SilentLoggerService();
      }

      return new LoggerService()
    }}
  ]
})
export class CoreModule { }
