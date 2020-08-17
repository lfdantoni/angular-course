import { Injectable } from '@angular/core';

@Injectable()
export class LoggerFormatService {

  constructor() { }

  log(obj: any): void {
    console.log('With Format', obj);
  }
}
