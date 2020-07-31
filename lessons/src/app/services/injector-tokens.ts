import { InjectionToken } from '@angular/core';
import { AppConfig } from '../models/app-config';

const APP_CONFIG_TOKEN = new InjectionToken<AppConfig>('app.config');

export {
  APP_CONFIG_TOKEN
};
