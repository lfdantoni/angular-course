import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

// The extends is not necessary, it is a recommendation in order to be sure any possible factory value
// meet the provider contract, in this case, LoggerService
@Injectable()
export class SilentLoggerService extends LoggerService {
  // `override` keyword is necessary to override a parent method
  override log(_: any) { }
}
