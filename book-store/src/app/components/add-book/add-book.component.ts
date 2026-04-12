import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { BookService } from '../../services/book.service';
import { isbnValidator } from '../../validators/isbn.validator';

@Component({
  selector: 'app-add-book',
  imports: [ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  // inject(FormBuilder) — modern DI, equivalent to constructor(private fb: FormBuilder)
  private fb = inject(FormBuilder);
  private bookService = inject(BookService);
  private router = inject(Router);

  // fb.group() builds a FormGroup with typed controls.
  // Each field: [initialValue, validators]
  // Typed Reactive Forms (Angular 14+): types are inferred from the initial value.
  form = this.fb.group({
    title:      ['', [Validators.required, Validators.minLength(3)]],
    author:     ['', Validators.required],
    categories: ['', Validators.required],
    year:       [null as number | null, Validators.min(1000)],
    isbn:       ['', isbnValidator()],  // custom validator
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    const { title, author, categories, year, isbn } = this.form.value;

    this.bookService.addBook({
      id: this.bookService.nextId(),
      title: title!,
      author: author!,
      // Split comma-separated string into trimmed array
      categories: (categories ?? '').split(',').map(c => c.trim()).filter(Boolean),
      inStock: true,
      year: year ?? undefined,
      isbn: isbn || undefined,
    });

    this.form.reset();
    this.router.navigate(['/books']);
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
