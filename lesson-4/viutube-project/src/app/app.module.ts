import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ModifyVideoFormComponent } from './manage-videos/modify-video/modify-video-form.component';
import { ListVideosComponent } from './manage-videos/list-videos/list-videos.component';
import { HighLightDirective } from './shared/directives/high-light/high-light.directive';
import { LoggerService } from './shared/services/logger/logger.service';
import { ManageVideosModule } from './manage-videos/manage-videos.module';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    HighLightDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ManageVideosModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
