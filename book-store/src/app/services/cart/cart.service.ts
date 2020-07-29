import { Injectable } from '@angular/core';
import { CartSummarize } from '../../models/CartSummarize';
import { BookCategory } from '../..//models/BookCategory';
import { CategoryList } from '../../mock-data';
import { Book } from 'src/app/models/Book';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Book[] = [];

  constructor() { }

  addBook(book: Book): void {
    this.items.push(book);
  }

  getCategories(): BookCategory[] {
    return CategoryList;
  }

  getSummarize(): CartSummarize {
    if (this.items.length) {
      return {
        itemsCount: this.items.length,
        totalPrice: this.items.map(item => item.price).reduce((prev, current) => prev + current)
      };
    }

    return {
      itemsCount: 0,
      totalPrice: 0
    };
  }
}
