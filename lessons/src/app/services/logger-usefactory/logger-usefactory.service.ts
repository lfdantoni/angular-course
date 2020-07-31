import { Injectable } from '@angular/core';

@Injectable()
export class LoggerUseFactoryService {
  log(obj: any): void {
    console.log('LoggerUseFactoryService log (useFactory): ', obj);
  }
}
