import { Component, Input } from '@angular/core';
import { BookCategory } from '../../models/book-category';
import { CartSummary } from '../../models/cart-summary';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() categories: BookCategory[] = [];
  @Input() cartSummarize?: CartSummary;

  constructor() { }

  get cartDescription(): string {
    if (this.cartSummarize) {
      return `${this.cartSummarize.itemsCount} ITEMS - $${this.cartSummarize.totalPrice.toFixed(2)}`;
    }

    return '0 ITEMS - $0.00';
  }
}
