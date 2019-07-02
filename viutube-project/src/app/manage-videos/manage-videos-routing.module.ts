import { NgModule } from '@angular/core';
import { ModifyVideoFormComponent } from './modify-video/modify-video-form.component';
import { ListVideosComponent } from './list-videos/list-videos.component';
import { Routes, RouterModule } from '@angular/router';

const heroesRoutes: Routes = [
    { path: 'list',  component: ListVideosComponent },
    { path: 'modify/:id', component: ModifyVideoFormComponent },
    { path: 'add', component: ModifyVideoFormComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(heroesRoutes)
    ],
    exports: [RouterModule]
})
export class ManageVideosRoutingModule { }