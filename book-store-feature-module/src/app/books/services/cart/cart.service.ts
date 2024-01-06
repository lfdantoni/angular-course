import { Injectable } from '@angular/core';
import { Book } from '../../models/book';
import { CartSummary } from '../../models/cart-summary';

@Injectable()
export class CartService {
  private items: Book[] = [];

  constructor() { }

  addBook(book: Book): void {
    this.items.push(book);
  }

  getSummarize(): CartSummary {
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
