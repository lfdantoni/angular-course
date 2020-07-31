import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerUseClassService extends LoggerService {
  log(obj: any): void {
    console.log('LoggerUseClassService log (useClass): ', obj);
  }
}
