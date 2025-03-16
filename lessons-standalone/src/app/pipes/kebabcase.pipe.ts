import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabCase'
})
export class KebabCasePipe implements PipeTransform {

  transform(value: string): string {
    return value.toLowerCase().replace(/ /g, '-');
  }

}
