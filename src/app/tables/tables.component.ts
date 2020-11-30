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

  selectedId: number;

  constructor(private districtModel: DistrictModel,
              private domainModel: DomainModel,
              private locationModel: LocationModel,
  ) {
  }

  ngOnInit(): void { }

  getId(key: number): void {
   this.selectedId = key;
  }

  getDistrict(key: number): District {
    return this.districtModel.getDistrict(key);
  }

  getDistrictByName(name: string): District{
    return this.districtModel.getDistrictByName(name);
  }

  getDistricts(): District[]{
    return this.districtModel.getDistricts();
  }

  deleteDistrict(key: number): void {
    this.districtModel.deleteDistrict(key);
  }

  editDistrict(districtId: number, districtName: string): void {
    const district: District = this.getDistrict(districtId);
    district.districtName = districtName;
    this.districtModel.saveDistrict(district);
  }

  createDistrict(districtName: string): void {
    const district: District = new District();
    district.districtName = districtName;
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

  editDomain(domainId: number, domainName: string): void {
    const domain: Domain = this.getDomain(domainId);
    domain.domainName = domainName;
    this.domainModel.saveDomain(domain);
  }

  createDomain(domainName: string): void {
    const domain: Domain = new Domain();
    domain.domainName = domainName;
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

  editLocation(locationId: number, locationName: string, districtName: string): void {
    const location: Location = this.getLocation(locationId);
    const district: District = this.getDistrictByName(districtName);
    location.locationName = locationName;
    location.district = district;
    this.locationModel.saveLocation(location);
  }

  createLocation(locationName: string, districtName: string): void {
    const location: Location = new Location();
    const district: District = this.getDistrictByName(districtName);
    location.locationName = locationName;
    location.district = district;
    this.locationModel.saveLocation(location);
  }
}
