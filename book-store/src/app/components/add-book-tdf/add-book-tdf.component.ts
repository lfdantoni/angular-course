import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { BookService } from '../../services/book.service';
import { IsbnValidatorDirective } from '../../validators/isbn-validator.directive';

@Component({
  selector: 'app-add-book-tdf',
  imports: [FormsModule, IsbnValidatorDirective],
  templateUrl: './add-book-tdf.component.html',
  styleUrl: './add-book-tdf.component.css'
})
export class AddBookTdfComponent {
  private bookService = inject(BookService);
  private router = inject(Router);

  // Template-Driven Form: the model lives as component properties bound via [(ngModel)].
  // The form state (valid/touched/dirty) lives in the template's NgForm and NgModel instances.
  book = {
    title: '',
    author: '',
    categories: '',
    year: null as number | null,
    isbn: '',
  };

  // onSubmit receives the NgForm instance from the template: (ngSubmit)="onSubmit(form)"
  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.bookService.addBook({
      id: this.bookService.nextId(),
      title: this.book.title,
      author: this.book.author,
      categories: this.book.categories.split(',').map(c => c.trim()).filter(Boolean),
      inStock: true,
      year: this.book.year ?? undefined,
      isbn: this.book.isbn || undefined,
    });

    form.reset();
    this.router.navigate(['/books']);
  }
}
