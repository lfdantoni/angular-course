import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule],
  templateUrl: './data-binding.component.html',
  styleUrl: './data-binding.component.css'
})
export class DataBindingComponent {
  // 1. Interpolation
  bookTitle: string = 'Clean Code';
  quantity: number = 3;

  // 2. Property binding
  imageUrl: string = 'https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png';
  isDisabled: boolean = false;

  // 3. Event binding
  clickCount: number = 0;
  lastKey: string = '';

  // 4. Two-way binding (requires FormsModule)
  searchText: string = '';

  // @switch demo
  bookStatus: 'available' | 'limited' | 'out-of-stock' = 'available';

  onButtonClick() {
    this.clickCount++;
  }

  onKeyPress(event: KeyboardEvent) {
    this.lastKey = event.key;
  }
}
