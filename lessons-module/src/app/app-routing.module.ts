import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { BookListComponent } from './book-list/book-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsComponent } from './forms/forms.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  { path: 'data-binding', component: DataBindingComponent, canActivate: [authGuard] },
  { path: 'forms', component: FormsComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'book-list/:category', component: BookListComponent},
  { path: 'posts', component: PostListComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: 'book-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
