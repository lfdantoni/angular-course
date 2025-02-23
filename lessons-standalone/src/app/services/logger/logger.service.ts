import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  protected createdAt = new Date().getTime();

  constructor() {
    console.log('LoggerService created at ' + this.createdAt);
  }

  log(value: string) {
    console.log('LoggerService %s %c %s', this.createdAt, 'background: #222; color: green', value)
  }
}
