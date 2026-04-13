import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { LoggerService, SilentLoggerService } from './services/logger.service';
import { APP_CONFIG } from './tokens/app-config.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideHttpClient() — enables HttpClient throughout the app (Angular 15+).
    // withFetch() uses the native Fetch API instead of XMLHttpRequest (recommended).
    // Legacy alternative (Angular <15, NgModule projects): import HttpClientModule in AppModule.
    provideHttpClient(withFetch()),

    // useFactory — creates the instance with custom logic at startup.
    // Returns SilentLoggerService in production, LoggerService in development.
    // This provider overrides the default providedIn: 'root' registration.
    {
      provide: LoggerService,
      useFactory: () => environment.production
        ? new SilentLoggerService()
        : new LoggerService(),
    },

    // useValue — registers a plain object under an InjectionToken (no class needed).
    {
      provide: APP_CONFIG,
      useValue: {
        appName: 'BookStore',
        maxBooks: 100,
        currency: 'ARS',
      },
    },
  ],
};
