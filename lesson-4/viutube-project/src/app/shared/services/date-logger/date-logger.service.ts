import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class DateLoggerService extends LoggerService {

  constructor() { 
    super();
  }

  log(obj: any) {
    super.log({
      type: 'Date Logger',
      data: obj,
      date: new Date()});
  }
}
