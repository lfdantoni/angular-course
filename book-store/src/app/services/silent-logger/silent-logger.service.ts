import { Injectable } from '@angular/core';

@Injectable()
export class SilentLoggerService {

  constructor() { }

  log(obj: any): void {
    console.log('SilentLoggerService log: ', obj);
  }
}
