import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighLight]',
  standalone: false
})
export class HighLightDirective {
  constructor(private el: ElementRef) { }

  // second HostListener param is optional (['$event'])
  @HostListener('mouseenter', ['$event']) onMouseEnter(event: MouseEvent) {
    console.log('mouseEvent', event)
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string | null) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
