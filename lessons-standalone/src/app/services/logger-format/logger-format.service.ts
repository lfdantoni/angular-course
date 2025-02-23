import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

// The extends is not necessary, it is a recommendation in order to be sure any possible factory value
// meet the provider contract, in this case, LoggerService
@Injectable()
export class LoggerFormatService extends LoggerService {
  constructor() {
    super();
    console.log('LoggerFormatService created at ' + this.createdAt);
  }

  // `override` keyword is necessary to override a parent method
  override log(value: string) {
    console.log('LoggerFormatService %s %c %s', this.createdAt, 'background: #222; color: red', value)
  }
}
