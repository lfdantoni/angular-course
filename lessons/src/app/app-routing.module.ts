import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'data-binding', component: DataBindingComponent, canActivate: [AuthGuard] },
  { path: 'book-list', component: BookListComponent },
  { path: 'book-list/:id', component: BookListComponent},
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: 'book-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
