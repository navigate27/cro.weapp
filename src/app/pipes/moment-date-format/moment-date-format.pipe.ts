import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentDateFormat'
})
export class MomentDateFormatPipe implements PipeTransform {

  transform(value: string) {
    return moment(value).format('MMM D, YYYY h:mmA');
  }

}
