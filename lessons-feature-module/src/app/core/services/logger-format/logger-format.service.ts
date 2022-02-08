import { Injectable } from '@angular/core';

@Injectable()
export class LoggerFormatService {

  constructor() { }

  log(value: any) {
    console.log('LoggerFormatService', value)
  }
}
