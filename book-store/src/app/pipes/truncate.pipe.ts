import { Pipe, PipeTransform } from '@angular/core';

// Custom pipe — standalone: true means it can be added directly to a component's imports array.
// @Pipe({ name: 'truncate' }) — 'truncate' is the name used in templates: {{ value | truncate:40 }}
@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  // transform() receives the value and optional parameters passed after the colon.
  // {{ title | truncate }}        → limit defaults to 50
  // {{ title | truncate:30 }}     → limit = 30
  transform(value: string, limit = 50): string {
    return value.length > limit ? value.slice(0, limit) + '...' : value;
  }
}
