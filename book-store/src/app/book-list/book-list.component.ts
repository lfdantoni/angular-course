import { Component, OnInit } from '@angular/core';
import Books from '../mock-data';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books = Books;

  constructor() { }

  ngOnInit(): void {
  }

}
