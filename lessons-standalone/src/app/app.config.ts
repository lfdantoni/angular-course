import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { LoggerService } from './services/logger/logger.service';
import { LoggerFormatService } from './services/logger-format/logger-format.service';
import { SilentLoggerService } from './services/silent-logger/silent-logger.service';
import { environment } from '../environments/environment';
import { PayPalToken } from './services/injector-tokens';
import { PayPalConfig } from './models/paypal-config';
import { provideHttpClient } from '@angular/common/http';

const payPalToken: PayPalConfig = {
  clientId: '12312qeqwe',
  secretId: '13123123asdasd',
  url: ''
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    provideHttpClient(), // Http Client
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
  ]
};
