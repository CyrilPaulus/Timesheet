import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value)
      return;

    let minutes = value % 60;
    if (minutes < 10)
      minutes = <any>('0' + minutes);

    let hours = Math.floor(value / 60);

    return `${hours}h${minutes}`;
  }

}
