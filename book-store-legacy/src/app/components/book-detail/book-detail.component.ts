import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { booksMock } from '../../mock-data/books';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;

  // Constructor injection — equivalente NgModule de inject(ActivatedRoute) / inject(Router)
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // snapshot.params: lectura única — suficiente cuando el componente se destruye y recrea en cada navegación
    const id = Number(this.route.snapshot.params['id']);
    this.book = booksMock.find(b => b.id === id);

    // params observable: útil cuando el componente se mantiene montado y sólo cambia el param
    this.route.params.subscribe(params => {
      const paramId = Number(params['id']);
      console.log('Param changed (observable):', paramId);
    });

    // queryParams observable: reactivo, se dispara cuando cambia ?category=
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length) {
        console.log('QueryParams received:', params);
      }
    });

    // fragment observable: lee el hash de la URL (#section)
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        console.log('Fragment:', fragment);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/books']);
  }
}
