import { NgModule } from '@angular/core';
import { HighLightDirective } from './directives/high-light/high-light.directive';
import { CommonModule } from '@angular/common';
import { LoggerService } from './services/logger/logger.service';
import { VideoService } from './services/video/video.service';
import { DateLoggerService } from './services/date-logger/date-logger.service';

@NgModule({
    declarations: [
        HighLightDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [HighLightDirective],
    providers: [
        LoggerService,
        DateLoggerService,
        VideoService
    ]
})
export class SharedModule { }