import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBookStatus]',
  standalone: false,
})
export class BookStatusDirective {
  @Input() appBookStatus: boolean = false;

  @HostBinding('style.backgroundColor')
  get backgroundColor(): string {
    return this.appBookStatus ? '#e8f5e9' : '#ffebee';
  }
}
