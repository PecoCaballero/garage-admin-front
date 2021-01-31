import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'licensePlate'
})
export class LicensePlatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value.length == 7) {
      return value.slice(0, 3) + '-' + value.slice(3, 7);
    }
    return value
  }

}
