import { Pipe, PipeTransform } from '@angular/core';
import {Document} from '@app/core/interfaces/document';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], search: string): any[] {
    if (search === undefined || search === "") {
      return items;
    }
    return items.filter(item => JSON.stringify(item).toUpperCase().includes(search.toString().toUpperCase()));
  }

}
