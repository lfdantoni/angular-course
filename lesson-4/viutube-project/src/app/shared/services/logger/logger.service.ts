import { Injectable } from '@angular/core';

// Injected it in AppModule's provider
@Injectable()
export class LoggerService {
  logs: any[] = [];

  private createdDate: Date;

  constructor() { 
    this.createdDate = new Date();
  }

  log(obj: any) {
    this.logs.push(obj);
    console.log('LoggerService -> log: ', obj, ' Service created: ', this.createdDate);
  }
}
