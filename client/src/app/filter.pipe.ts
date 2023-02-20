import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(items: any) {
        var str = items;
        return str = str?.replace(/\s+/g, '-')?.toLowerCase();
    }
}
