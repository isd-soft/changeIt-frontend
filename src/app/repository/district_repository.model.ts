import {Injectable} from '@angular/core';
import {District} from '../models/district';
import {DistrictService} from '../services/district.service';

@Injectable()
export class DistrictModel {
  private district: District[] = new Array<District>();
  private locator = (d: District, id: number) => d.district_id == id;

  constructor(private districtService: DistrictService) {
    this.districtService.getAllDistricts().subscribe(district => {
      this.district = district
    });
  }

  getAllDistricts(): District[]{
    return this.district;
  }

  getDistrict(id: number): District {
    return this.district.find(d => this.locator(d, id));
  }
}
