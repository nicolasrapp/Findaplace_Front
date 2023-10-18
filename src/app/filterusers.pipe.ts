// filter-users.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {
  transform(users: any[], searchQuery: string): any[] {
    if (!searchQuery || searchQuery === '') {
      return users;
    }

    searchQuery = searchQuery.toLowerCase();

    return users.filter((user) => user.user_name.toLowerCase().includes(searchQuery));
  }
}
