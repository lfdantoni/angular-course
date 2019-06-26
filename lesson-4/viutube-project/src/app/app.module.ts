import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ModifyVideoFormComponent } from './modify-video/modify-video-form.component';
import { ListVideosComponent } from './list-videos/list-videos.component';
import { HighLightDirective } from './shared/directives/high-light/high-light.directive';
import { LoggerService } from './shared/services/logger/logger.service';


const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: ListVideosComponent},
  {path: 'add', component: ModifyVideoFormComponent},
  {path: 'modify/:id', component: ModifyVideoFormComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ModifyVideoFormComponent,
    ListVideosComponent,
    HighLightDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
