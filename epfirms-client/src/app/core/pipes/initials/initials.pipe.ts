import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'initials'
})

export class InitialsPipe implements PipeTransform {
  transform(value: string) {
    return value.split(" ").map(c => c.charAt(0).toUpperCase()).join("").concat(value.charAt(1)).substring(0,2);
  }
}