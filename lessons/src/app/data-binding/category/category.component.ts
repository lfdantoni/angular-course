import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  log() {
    this.cartService.addBook('my book CategoryComponent')
    console.log(this.cartService.getBooks())
  }

}
