import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mapToArray'})
export class MapToArrayPipe implements PipeTransform {
  transform(myObject: any): Array<any> {
    if (myObject)
      return Object.keys(myObject).map(function (key) { return myObject[key]; });
    else
      return [];
  }
}