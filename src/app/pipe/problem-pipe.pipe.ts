import { Pipe, PipeTransform } from '@angular/core';
import {District} from '@app/models/district';
import {Location} from '../models/location';
import {Problem} from '@app/models/problem';
import {Domain} from '@app/models/domain';

@Pipe({
  name: 'problemFilter'
})
export class ProblemPipe implements PipeTransform {

  transform(values: Problem[], district?: District, location?: Location, domains?: Domain[],
            statuses?: string[], searchValue?: string): Problem[] {

    if (!district && !location && !domains && !statuses){
      return values;
    }

    if (district ){
      values = values.filter(value => value?.location?.district?.district_id === district?.district_id);
    }

    if (location){
      values = values.filter(value =>
        (value?.location?.location_id === location?.location_id &&
          value?.location?.district?.district_id === district?.district_id));
    }


    if (domains.length != 0) {
      values = values.filter(value => this.checkIfValueContainAllDomains(value, domains));
    }

    if(statuses.length != 0) {
      values = values.filter(value => this.checkIfValueContainStatus(value, statuses));
    }

    if ( searchValue && searchValue.length != 0) {
      values = values.filter(value => this.checkExistingValue(value, searchValue));
    }

    return values;
  }

  checkIfValueContainAllDomains(value, domains): boolean {
    let check = true;
    if (value.domains.length < domains.length) {
      return false;
    }
    for (let domain of domains) {
      if (check) {
        check = false;
        for (let valDomain of value.domains) {
          if (domain.domain_id == valDomain.domain_id) {
            check = true;
          }
        }
      } else {
        return false;
      }
    }
    return check;
  }

  checkIfValueContainStatus(value: Problem, statuses: String[]) {
   let check = false;
   for(let status of statuses){
     if(value.status == status){
      check = true;
      return check;
     }
   }
   return check;
  }

  private checkExistingValue(value: Problem, searchValue: string) {
    return value.title.toLowerCase().includes(searchValue.toLowerCase()) || value.description.toLowerCase().includes(searchValue.toLowerCase());
  }
}


