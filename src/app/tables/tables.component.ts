import { Component, OnInit } from '@angular/core';
import {DistrictModel} from '@app/repository/district_repository.model';
import {District} from '@app/models/district';
import {DomainModel} from '@app/repository/domain_repository.model';
import {Domain} from '@app/models/domain';
import {LocationModel} from '@app/repository/location_repository.model';
import {Location} from '@app/models/location';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private districtModel: DistrictModel,
              private domainModel: DomainModel,
              private locationModel: LocationModel) {
  }

  ngOnInit(): void { }

  getDistrict(key: number): District {
    return this.districtModel.getDistrict(key);
  }

  getDistricts(): District[]{
    return this.districtModel.getDistricts();
  }

  deleteDistrict(key: number): void {
    this.districtModel.deleteDistrict(key);
  }

  editDistrict(district: District): void {
    this.districtModel.saveDistrict(district);
  }

  createDistrict(district: District): void {
    this.districtModel.saveDistrict(district);
  }

  getDomain(key: number): Domain {
    return this.domainModel.getDomain(key);
  }

  getDomains(): Domain[]{
    return this.domainModel.getDomains();
  }

  deleteDomain(key: number): void {
    this.domainModel.deleteDomain(key);
  }

  editDomain(domain: Domain): void {
    this.domainModel.saveDomain(domain);
  }

  createDomain(domain: Domain): void {
    this.domainModel.saveDomain(domain);
  }

  getLocation(key: number): Location {
    return this.locationModel.getLocation(key);
  }

  getLocations(): Location[]{
    return this.locationModel.getLocations();
  }

  deleteLocation(key: number): void {
    this.locationModel.deleteLocation(key);
  }

  editLocation(location: Location): void {
    this.locationModel.saveLocation(location);
  }

  createLocation(location: Location): void {
    this.locationModel.saveLocation(location);
  }
}
