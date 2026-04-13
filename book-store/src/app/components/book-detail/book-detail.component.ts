import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { BookStatusDirective } from '../../directives/book-status.directive';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  imports: [BookStatusDirective, NgStyle, RouterLink],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  // Inject Router and ActivatedRoute using inject() — modern approach
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  // Location.back() follows browser history — works regardless of which list the user came from
  private location = inject(Location);

  book: Book | undefined;

  ngOnInit(): void {
    // Singleton demo: bookService.createdAt is identical to the one in BookListComponent
    // because Angular's injector returns the same instance for providedIn: 'root' services.
    console.log('BookService singleton createdAt:', this.bookService.createdAt);

    // snapshot.params: one-time read — sufficient when the component is always
    // destroyed and re-created on navigation (the default in Angular router)
    const id = Number(this.route.snapshot.params['id']);
    this.book = this.bookService.getBookById(id);

    // params observable: use this when the component stays mounted and only the
    // param changes (e.g. navigating from /books/1 to /books/2 without leaving the view)
    this.route.params.subscribe(params => {
      const paramId = Number(params['id']);
      console.log('Param changed (observable):', paramId);
      // In a real use-case, reload data here instead of using snapshot above
    });

    // queryParams observable: reactive — re-runs whenever ?category= changes
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length) {
        console.log('QueryParams received:', params);
      }
    });

    // fragment observable: reads the URL hash (#section)
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        console.log('Fragment:', fragment);
      }
    });
  }

  // Location.back() — goes to the previous entry in the browser history.
  // This correctly returns to /books-obs if the user came from there,
  // or to /books if they came from the Signals version.
  // Equivalent to clicking the browser's back button.
  goBack(): void {
    this.location.back();
  }

  // Programmatic alternative to [queryParams] in template:
  // goToCategory(category: string): void {
  //   this.router.navigate(['/books'], { queryParams: { category } });
  // }
}
