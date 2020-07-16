import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  // @Input() coverImage: string = 'http://loremipsum.themerex.net/wp-content/uploads/2016/07/product-5.jpg';
  // @Input() title: string = 'Everybodys Fool: A novel';
  // @Input() author: string = 'Byron Kelly';
  // @Input() id: string = '123asd213';
  // @Input() stock: number = 10;
  @Input() coverImage: string;
  @Input() title: string;
  @Input() author: string;
  @Input() id: string;
  @Input() stock: number;

  // bgImageUrl: string;
  get bgImageUrl(): string {
    return `url('${this.coverImage}')`;
  }


  constructor() {
    // this.bgImageUrl = `url('${this.coverImage}')`;
  }

  ngOnInit(): void {
  }

  onAddCart() {
    console.log('added' + this.id);
  }
}
