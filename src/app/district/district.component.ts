import { Component, OnInit } from '@angular/core';
import {District} from '@app/models/district';
import {ActivatedRoute} from '@angular/router';
import {DistrictModel} from '@app/repository/district_repository.model';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {

  district: District = new District();

  constructor(private route: ActivatedRoute, private districtModel: DistrictModel) {
    route.params.subscribe(params => {
      const id = params.id;
      if (id != null) {
        Object.assign(this.district, districtModel.getDistrict(id));
      }
    });
  }

  ngOnInit(): void {
  }

}
