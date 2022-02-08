import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  log(value: string) {
    console.log('LoggerService', value)
  }
}
