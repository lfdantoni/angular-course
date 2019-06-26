import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AddVideoFormComponent } from './components/add-video-form/add-video-form.component';
import { ListVideosComponent } from './components/list-videos/list-videos.component';
import { HighLightDirective } from './directives/high-light/high-light.directive';
import { LoggerService } from './services/logger/logger.service';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ListVideosComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    AddVideoFormComponent,
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
