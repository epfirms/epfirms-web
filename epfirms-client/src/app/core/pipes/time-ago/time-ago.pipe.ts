import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TimeAgo',
  pure: false,
})
export class TimeAgoPipe extends DatePipe implements PipeTransform {
  transform(value: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 59) {
        return '<1m';
      }

      if (seconds >= 604800) {
        return super.transform(value);
      }

      const intervals = {
        d: 86400,
        h: 3600,
        m: 60,
        s: 1,
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) return counter + i;
      }
    }
    return value;
  }
}
