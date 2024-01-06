import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './core/components/intro/intro.component';

const routes: Routes = [
  { path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) }, // <-- remove if you dont want to use lazy loading
  { path: '', pathMatch: 'full', component: IntroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
