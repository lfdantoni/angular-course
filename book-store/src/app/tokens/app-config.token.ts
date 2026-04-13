import { InjectionToken } from '@angular/core';

// InjectionToken — used for non-class values (objects, strings, primitives).
// The string argument is a human-readable description used in error messages.
export interface AppConfig {
  appName: string;
  maxBooks: number;
  currency: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
