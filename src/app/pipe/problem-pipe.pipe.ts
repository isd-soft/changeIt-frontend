import { Pipe, PipeTransform } from '@angular/core';
import {District} from "@app/models/district";
import {Location} from "../models/location"
import {Problem} from "@app/models/problem";
import {Domain} from "@app/models/domain";

@Pipe({
  name: 'problemFilter'
})
export class ProblemPipe implements PipeTransform {
  transform(values: Problem[], district?: District, location?: Location): Problem[] {

    if(!district && !location){
      return values;
    }


    if(!location && district ){
      return values.filter(value =>
        value?.location?.district?.district_id === district.district_id);
    }

    if(location && district){
      return values.filter(value =>
        (value?.location.location_id === location.location_id &&
          value?.location?.district?.district_id === district.district_id))
    }
  }
}


