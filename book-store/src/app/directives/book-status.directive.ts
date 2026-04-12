import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appBookStatus]'
})
export class BookStatusDirective {
  appBookStatus = input.required<boolean>();

  @HostBinding('style.backgroundColor')
  get backgroundColor(): string {
    return this.appBookStatus() ? '#e8f5e9' : '#ffebee';
  }
}
