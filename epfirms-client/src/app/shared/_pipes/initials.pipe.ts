import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'initials'
})

export class InitialsPipe implements PipeTransform {
  transform(value: string) {
    return value.replace(/[a-z]/g, '').replace(' ', '');
  }
}