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

    district: District;

    constructor(private route: ActivatedRoute, private districtModel: DistrictModel) {}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id: number = parseInt(params.id, 10);
        if(id != null) {
          this.district = this.districtModel.getDistrict(id);
        }
      });
  }

}
