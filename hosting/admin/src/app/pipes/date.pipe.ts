import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'date'
})
export class DatePipe implements PipeTransform {

    transform(ms: any, args?: any): any {
        try {
            const date = new Date(ms);
            return date.getFullYear();
        } catch (e) {
            return '';
        }
    }

}
