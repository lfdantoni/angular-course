import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  private destroyRef = inject(DestroyRef);

  // Template-Driven Form: the model lives as component properties bound via [(ngModel)].
  // The form state (valid/touched/dirty) lives in the template's NgForm and NgModel instances.
  book = {
    title: '',
    author: '',
    categories: '',
    year: null as number | null,
    isbn: '',
  };

  error = '';
  isSaving = false;

  // onSubmit receives the NgForm instance from the template: (ngSubmit)="onSubmit(form)"
  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    // ── Lesson 3–4 approach (synchronous) — replaced in lesson 5 by createBook() Observable ──
    // addBook() mutated the in-memory signal directly — no HTTP call, no async handling needed.
    //
    // this.bookService.addBook({
    //   id: this.bookService.nextId(),
    //   title: this.book.title,
    //   author: this.book.author,
    //   categories: this.book.categories.split(',').map(c => c.trim()).filter(Boolean),
    //   inStock: true,
    //   year: this.book.year ?? undefined,
    //   isbn: this.book.isbn || undefined,
    // });
    // form.reset();
    // this.router.navigate(['/books']);
    // ──────────────────────────────────────────────────────────────────────────────────────────

    this.isSaving = true;

    this.bookService.createBook({
      title: this.book.title,
      author: this.book.author,
      categories: this.book.categories.split(',').map(c => c.trim()).filter(Boolean),
      inStock: true,
      year: this.book.year ?? undefined,
      isbn: this.book.isbn || undefined,
    }).pipe(
      // delay(): simulates network latency so the "Saving..." state is visible in the UI.
      // Remove in production or replace with a real loading indicator tied to actual response time.
      delay(1500),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        form.reset();
        this.router.navigate(['/books']);
      },
      error: err => {
        this.isSaving = false;
        this.error = err.message;
      },
    });
  }
}
