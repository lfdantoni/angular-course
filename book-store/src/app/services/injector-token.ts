
import {InjectionToken} from '@angular/core';
import { PayPalConfig } from '../models/PayPalConfig';

const PayPalToken = new InjectionToken<PayPalConfig>('PAYPAL CONFIG');

export {
  PayPalToken
};
