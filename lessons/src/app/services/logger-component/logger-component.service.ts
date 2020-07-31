import { Injectable } from '@angular/core';

@Injectable()
export class LoggerComponentService {

  log(obj: any): void {
    console.log('LoggerComponentService log: ', obj);
  }
}
