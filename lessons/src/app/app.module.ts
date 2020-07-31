import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BookComponent } from './data-binding/book/book.component';
import { HighLightDirective } from './directives/high-light.directive';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { FormsComponent } from './forms/forms.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';
import { TemplateDrivenFormComponent } from './forms/template-driven-form/template-driven-form.component';
import { ServiceExampleComponent } from './service-example/service-example.component';
import { LoggerModuleService } from './services/logger-module/logger-module.service';
import { LoggerService } from './services/logger/logger.service';
import { LoggerUseClassService } from './services/logger-useclass/logger-useclass.service';
import { LoggerUseValueService } from './services/logger-usevalue/logger-usevalue.service';
import { LoggerUseFactoryService } from './services/logger-usefactory/logger-usefactory.service';
import { LoggerProductionService } from './services/logger-production/logger-production.service';
import { LoggerDevelopmentService } from './services/logger-development/logger-development.service';
import { LoggerOptionalService } from './services/logger-optional/logger-optional.service';
import { environment } from 'src/environments/environment';

const loggerUseValueService = new LoggerUseValueService();

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    HighLightDirective,
    DataBindingComponent,
    FormsComponent,
    ReactiveFormComponent,
    TemplateDrivenFormComponent,
    ServiceExampleComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // reactive forms
    FormsModule  // Template-Driven forms
  ],
  providers: [
    LoggerModuleService, // it is the same as {provide: LoggerModuleService, useClass: LoggerModuleService}
    // {provide: LoggerService, useClass: LoggerUseClassService}, // uncomment for using LoggerUseClassService instead of LoggerService
    {provide: LoggerUseValueService, useValue: loggerUseValueService},
    {provide: LoggerUseFactoryService, useFactory: () => {
      if (environment.production) {
        return new LoggerProductionService();
      }

      return new LoggerDevelopmentService();
    }},
    LoggerOptionalService, // it can be removed and ServiceExampleComponent won't fail due it is using @Optional()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
