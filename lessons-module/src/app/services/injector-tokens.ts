import { InjectionToken } from "@angular/core";
import { PayPalConfig } from "../models/paypal-config";

// InjectionToken<T>
// T is the value type returned by the injector
const PayPalToken = new InjectionToken<PayPalConfig>('PAYPAL CONFIG');

export {
  PayPalToken
};
