import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { booksMock } from '../../mock-data/books';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  cart: Book[] = [];
  activeCategory: string = '';
  categories: string[] = [...new Set(booksMock.flatMap(b => b.categories))].sort();

  // Constructor injection — equivalente NgModule de inject()
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    console.log('BookListComponent initialized');

    // localStorage: restaurar carrito de sesión anterior
    const savedCart = localStorage.getItem('cart');
    this.cart = savedCart ? JSON.parse(savedCart) : [];

    // queryParams observable: filtra libros cuando cambia ?category=
    this.route.queryParams.subscribe(params => {
      this.activeCategory = params['category'] ?? '';
      this.books = this.activeCategory
        ? booksMock.filter(b => b.categories.includes(this.activeCategory))
        : booksMock;
    });
  }

  ngOnDestroy(): void {
    console.log('BookListComponent destroyed');
  }

  addToCart(book: Book) {
    this.cart.push(book);
    // localStorage: persistir carrito entre navegaciones
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log('Cart:', this.cart);
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }

  navigateToDetail(book: Book) {
    // Navegación programática — equivalente a [routerLink]="['/books', book.id]"
    this.router.navigate(['/books', book.id]);
  }
}
