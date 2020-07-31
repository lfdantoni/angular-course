import { Injectable } from '@angular/core';
import { LoggerUseFactoryService } from '../logger-usefactory/logger-usefactory.service';

@Injectable()
export class LoggerProductionService extends LoggerUseFactoryService {
  log(obj: any): void {
    console.log('LoggerUseFactoryService -> LoggerProductionService log (useFactory): ', obj);
  }
}
