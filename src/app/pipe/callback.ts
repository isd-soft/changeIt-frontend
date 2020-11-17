import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'callback',
  pure: false
})
export class Callback implements PipeTransform {
  transform(items: any[], callback: (item: any) => boolean): any {
    if (!items || !callback) {
      return items;
    }
    return items.filter(item => callback(item));
  }
}
