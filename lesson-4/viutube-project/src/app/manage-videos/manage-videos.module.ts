import { NgModule } from '@angular/core';
import { ModifyVideoFormComponent } from './modify-video/modify-video-form.component';
import { ListVideosComponent } from './list-videos/list-videos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManageVideosRoutingModule } from './manage-videos-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ManageVideosRoutingModule
    ],
    declarations: [
        ModifyVideoFormComponent,
        ListVideosComponent
    ]
})
export class ManageVideosModule { }