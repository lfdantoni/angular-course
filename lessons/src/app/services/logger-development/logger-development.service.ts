import { Injectable } from '@angular/core';
import { LoggerUseFactoryService } from '../logger-usefactory/logger-usefactory.service';

@Injectable()
export class LoggerDevelopmentService extends LoggerUseFactoryService {

  log(obj: any): void {
    console.log('LoggerUseFactoryService -> LoggerDevelopmentService log (useFactory): ', obj);
  }
}
