import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  log(obj: any): void {
    console.log('LoggerService log: ', obj);

  }
}
