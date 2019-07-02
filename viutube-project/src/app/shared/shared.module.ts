import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { 
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule
} from '@angular/material';

import { HighLightDirective } from './directives/high-light/high-light.directive';
import { CommonModule } from '@angular/common';
import { LoggerService } from './services/logger/logger.service';
import { VideoService } from './services/video/video.service';
import { DateLoggerService } from './services/date-logger/date-logger.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
    declarations: [
        HighLightDirective,
        ConfirmationDialogComponent
    ],
    entryComponents: [ // use entryComponent when you create component dynamically
        ConfirmationDialogComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule
    ],
    exports: [
        HighLightDirective,
        ConfirmationDialogComponent,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule
    ],
    providers: [
        LoggerService,
        DateLoggerService,
        VideoService
    ]
})
export class SharedModule { }