import { Injectable } from '@angular/core';

@Injectable()
export class LoggerModuleService {

  log(obj: any): void {
    console.log('LoggerModuleService log: ', obj);
  }
}
