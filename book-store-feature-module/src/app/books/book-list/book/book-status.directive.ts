import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBookStatus]'
})
export class BookStatusDirective {
  @Input()
  set stock(value: number) {
    if (value < 5) {
      this.el.nativeElement.classList.add('low-stock');
    } else if (value < 10) {
      this.el.nativeElement.classList.add('medium-stock');
    } else {
      this.el.nativeElement.classList.add('high-stock');
    }
  }

  constructor(private el: ElementRef) { }

}
