import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Book } from '../../models/book';
import { booksMock } from '../../mock-data/books';
import { BookStatusDirective } from '../../directives/book-status.directive';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  imports: [BookStatusDirective, NgStyle],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  // Inject Router and ActivatedRoute using inject() — modern approach
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  book: Book | undefined;

  ngOnInit(): void {
    // Read route param from snapshot (one-time read)
    const id = Number(this.route.snapshot.params['id']);
    this.book = booksMock.find(b => b.id === id);

    // Also read queryParams (demo — e.g. /books/1?ref=home)
    const queryParams = this.route.snapshot.queryParams;
    if (Object.keys(queryParams).length) {
      console.log('QueryParams received:', queryParams);
    }

    // Alternative: subscribe to params observable (for cases where
    // the component stays mounted and only the param changes)
    // this.route.params.subscribe(params => {
    //   const id = Number(params['id']);
    //   this.book = booksMock.find(b => b.id === id);
    // });
  }

  // Programmatic navigation using inject(Router)
  goBack(): void {
    this.router.navigate(['/books']);
  }

  goToCategory(category: string): void {
    // Navigate with queryParams
    this.router.navigate(['/books'], { queryParams: { category } });
  }
}
