import { Injectable } from '@angular/core';

@Injectable()
export class LoggerUseValueService {

  log(obj: any): void {
    console.log('LoggerUseValueService log (useValue): ', obj);
  }
}
