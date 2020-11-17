import {Component, OnInit} from '@angular/core';
import {District} from '@app/models/district';
import {DistrictModel} from '@app/repository/district_repository.model';
import {Problem} from '@app/models/problem';
import {Location} from "../models/location"
import {ProblemModel} from '@app/repository/problem_repository.model';
import {LocationModel} from "@app/repository/location_repository.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedDistrict: District;

  constructor(private problemModel: ProblemModel, private districtModel: DistrictModel,
              private locationModel: LocationModel) {
  }

  ngOnInit(): void {
  }

  getProblems(): Problem[] {
    return this.problemModel.getProblems();
  }


  getDistricts(): District[] {
    return this.districtModel.getAllDistricts();
  }

  getAllLocations(): Location[]{
    return this.locationModel.getAllLocations();
  }

  display(){
    console.log(this.selectedDistrict)
  }

}
