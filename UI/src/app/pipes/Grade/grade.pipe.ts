import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grade'
})
export class GradePipe implements PipeTransform {

  transform(value?: number | string, args?: any): any {
    return (value == 0) ? "-" : value;
  }

}
