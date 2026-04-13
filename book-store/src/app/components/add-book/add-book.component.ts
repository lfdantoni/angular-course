import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { isbnValidator } from '../../validators/isbn.validator';

@Component({
  selector: 'app-add-book',
  imports: [ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  private fb = inject(FormBuilder);
  private bookService = inject(BookService);
  private router = inject(Router);
  // inject(DestroyRef) — used to pass to takeUntilDestroyed() when called outside the constructor
  private destroyRef = inject(DestroyRef);

  error = '';
  isSaving = false;

  // fb.group() builds a FormGroup with typed controls.
  // Typed Reactive Forms (Angular 14+): types inferred from the initial value.
  form = this.fb.group({
    title:      ['', [Validators.required, Validators.minLength(3)]],
    author:     ['', Validators.required],
    categories: ['', Validators.required],
    year:       [null as number | null, Validators.min(1000)],
    isbn:       ['', isbnValidator()],
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    const { title, author, categories, year, isbn } = this.form.value;

    // ── Lesson 3–4 approach (synchronous) — replaced in lesson 5 by createBook() Observable ──
    // addBook() mutated the in-memory signal directly — no HTTP call, no async handling needed.
    //
    // this.bookService.addBook({
    //   id: this.bookService.nextId(),
    //   title: title!,
    //   author: author!,
    //   categories: (categories ?? '').split(',').map(c => c.trim()).filter(Boolean),
    //   inStock: true,
    //   year: year ?? undefined,
    //   isbn: isbn || undefined,
    // });
    // this.form.reset();
    // this.router.navigate(['/books']);
    // ──────────────────────────────────────────────────────────────────────────────────────────

    this.isSaving = true;

    // createBook returns an Observable — subscribe with takeUntilDestroyed so Angular
    // automatically cancels the subscription if the user navigates away before the response.
    this.bookService.createBook({
      title: title!,
      author: author!,
      categories: (categories ?? '').split(',').map(c => c.trim()).filter(Boolean),
      inStock: true,
      year: year ?? undefined,
      isbn: isbn || undefined,
    }).pipe(
      // delay(): simulates network latency so the "Saving..." state is visible in the UI.
      // Remove in production or replace with a real loading indicator tied to actual response time.
      delay(1500),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['/books']);
      },
      error: err => {
        this.isSaving = false;
        this.error = err.message;
      },
    });
  }
}

// Template-Driven Form equivalent (for reference — uses ngModel + FormsModule):
//
// In the template:
//   <form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
//     <input name="title" [(ngModel)]="book.title" required minlength="3">
//     <button [disabled]="myForm.invalid">Save</button>
//   </form>
//
// In the component:
//   import { FormsModule } from '@angular/forms';
//   book = { title: '', author: '' };
//   onSubmit(form: NgForm) { if (form.valid) console.log(this.book); }
//
// Key difference: TDF keeps logic in the template; Reactive keeps it in the class.
