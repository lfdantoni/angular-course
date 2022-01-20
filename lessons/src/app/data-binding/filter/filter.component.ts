import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  // providers: [CartService], // it overrides the app CartService registration
})
export class FilterComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  log() {
    this.cartService.addBook('my book FilterComponent')
    console.log(this.cartService.getBooks())
  }
}
