import {Injectable} from '@angular/core';
import {District} from '../models/district';
import {DistrictService} from '../service/district.service';

@Injectable()
export class DistrictModel {
  private district: District[] = new Array<District>();
  private locator = (d: District, id: number) => d.district_id == id;
  private locatorByName = (d: District, name: string) => d.districtName == name;

  constructor(private districtService: DistrictService) {
    this.districtService.getData().subscribe(data => this.district = data);
  }

  getDistricts(): District[] {
    return this.district;
  }
  getDistrict(id: number): District {
    return this.district.find(d => this.locator(d, id));
  }
  getDistrictByName(districtName: string): District {
    return this.district.find(d => this.locatorByName(d, districtName));
  }

  saveDistrict(district: District): void {
    if (district.district_id == 0 || district.district_id == null) {
      this.districtService.createDistrict(district)
        .subscribe(d => this.district.push(d));
    } else {
      this.districtService.updateDistrict(district).subscribe(d => {
        const index = this.district
          .findIndex(item => this.locator(item, d.district_id));
        this.district.splice(index, 1, d);
      });
    }
  }

  deleteDistrict(key: number) {
    return this.districtService.deleteDistrict(key);
  }

}
