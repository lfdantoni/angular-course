import { Component, OnInit, Optional, Inject } from '@angular/core';
import { LoggerService } from '../services/logger/logger.service';
import { LoggerModuleService } from '../services/logger-module/logger-module.service';
import { LoggerUseValueService } from '../services/logger-usevalue/logger-usevalue.service';
import { LoggerUseFactoryService } from '../services/logger-usefactory/logger-usefactory.service';
import { LoggerOptionalService } from '../services/logger-optional/logger-optional.service';
import { LoggerComponentService } from '../services/logger-component/logger-component.service';
import { APP_CONFIG_TOKEN } from '../services/injector-tokens';
import { AppConfig } from '../models/app-config';

@Component({
  selector: 'app-service-example',
  templateUrl: './service-example.component.html',
  styleUrls: ['./service-example.component.css'],
  providers: [LoggerComponentService]
})
export class ServiceExampleComponent implements OnInit {


  constructor(
    private logger: LoggerService,
    private loggerModule: LoggerModuleService,
    private loggerUseValue: LoggerUseValueService,
    private loggerUseFactory: LoggerUseFactoryService,
    private loggerComponent: LoggerComponentService,
    @Inject(APP_CONFIG_TOKEN) appConfig: AppConfig,
    @Optional() private loggerOptional: LoggerOptionalService
  ) {
    this.logger.log('ServiceExampleComponent');
    this.loggerModule.log('ServiceExampleComponent');
    this.loggerUseValue.log('ServiceExampleComponent');
    this.loggerUseFactory.log('ServiceExampleComponent');
    this.loggerComponent.log('ServiceExampleComponent');
    this.logger.log(appConfig);

    if (this.loggerOptional) {
      this.loggerOptional.log('ServiceExampleComponent');
    }
  }

  ngOnInit(): void {
  }

}
