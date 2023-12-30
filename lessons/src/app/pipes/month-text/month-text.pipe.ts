import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthText'
})
export class MonthTextPipe implements PipeTransform {

  transform(value: number, type: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined = 'long'): string {
    const date = new Date();
    date.setMonth(value - 1)
    return date.toLocaleString('default', {month: type});
  }

}
