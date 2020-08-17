import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class SilentLoggerService extends LoggerService {
  log(obj: any): void {
    console.log('SilentLoggerService log: ', obj);
  }
}
