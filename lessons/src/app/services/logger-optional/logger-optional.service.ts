import { Injectable } from '@angular/core';

@Injectable()
export class LoggerOptionalService {

  log(obj: any): void {
    console.log('LoggerOptionalService log: ', obj);
  }
}
