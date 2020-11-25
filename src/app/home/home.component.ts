﻿import {Component, OnInit} from '@angular/core';
import {District} from '@app/models/district';
import {DistrictModel} from '@app/repository/district_repository.model';
import {Problem} from '@app/models/problem';
import {Location} from '../models/location';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {LocationModel} from '@app/repository/location_repository.model';
import {Domain} from '@app/models/domain';
import {DomainModel} from '@app/repository/domain_repository.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  voteSorting = true;
  dateSorting = true;
  sort = 'vote';
  selectedDistrict: District;
  selectedLocation: Location;
  selectedDomains: Domain[] = [];


  constructor(private problemModel: ProblemModel, private districtModel: DistrictModel,
              private locationModel: LocationModel, private domainModel: DomainModel) {
  }

  ngOnInit(): void {
  }

  getDistricts(): District[] {
    return this.districtModel.getDistricts();
  }

  getProblems(): Problem[] {
    if (this.sort === 'vote') {
      return this.problemModel.getProblemsByVote(this.voteSorting);
    } else {
      return this.problemModel.getProblemsByDate(this.dateSorting);
    }
  }

  getAllDomains(): Domain[] {
    return this.domainModel.getAllDomains();
  }

  getAllLocations(): Location[] {
    if (!this.selectedDistrict) {
      return null;
    }
    return this.locationModel.getAllLocations().filter(location =>
      location.district.district_id === this.selectedDistrict.district_id);
  }

  onSelectDomain(status: any, domain: Domain): void{
    if (status.target.checked) {
      this.selectedDomains.push(domain);
    }
    if (!status.target.checked) {
      const index: number = this.selectedDomains.indexOf(domain);
      if (index !== -1) {
        this.selectedDomains.splice(index, 1);
      }
    }
  }

  toggleVoteSorting(): void {
    this.sort = 'vote';
    this.voteSorting = !this.voteSorting;
  }

  toggleDateSorting(): void {
    this.sort = 'date';
    this.dateSorting = !this.dateSorting;
  }


  onChange(): void {
    this.selectedLocation = null;
  }
}
