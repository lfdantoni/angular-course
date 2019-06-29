import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ManageVideosModule } from './manage-videos/manage-videos.module';
import { SharedModule } from './shared/shared.module';


const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'}
]


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ManageVideosModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
