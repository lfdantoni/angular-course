import { Component, Input } from '@angular/core';
import { CategoryList } from 'src/app/mock-data';
import { CartSummarize } from '../../models/CartSummarize';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() categories = [];
  @Input() cartSummarize: CartSummarize;

  constructor() { }

  get cartDescription(): string {
    if (this.cartSummarize) {
      return `${this.cartSummarize.itemsCount} ITEMS - $${this.cartSummarize.totalPrice.toFixed(2)}`;
    }

    return '0 ITEMS - $0.00';
  }
}
