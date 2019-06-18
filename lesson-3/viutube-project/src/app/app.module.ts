import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddVideoFormComponent } from './components/add-video-form/add-video-form.component';
import { ListVideosComponent } from './components/list-videos/list-videos.component';
import { HighLightDirective } from './directives/high-light/high-light.directive';
import { LoggerService } from './services/logger/logger.service';
import { PageProperties } from './models/PageProperties';
import { TITLE } from './services/injection-tokens';

const pageProperties: PageProperties = {
  title: 'ViuTube',
  description: 'Online Videos'
}

@NgModule({
  declarations: [
    AppComponent,
    AddVideoFormComponent,
    ListVideosComponent,
    HighLightDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    LoggerService, // It is the same "provideIn: 'root'"
    {provide: PageProperties, useValue: pageProperties}, // set a page properties object as PageProperties class dependency
    {provide: TITLE, useValue: 'ViuTube'} // set a page title as constant dependency with TITLE as the token injection key
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
