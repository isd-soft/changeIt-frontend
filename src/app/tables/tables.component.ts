import { Component, OnInit } from '@angular/core';
import {DistrictModel} from '@app/repository/district_repository.model';
import {District} from '@app/models/district';
import {DomainModel} from '@app/repository/domain_repository.model';
import {Domain} from '@app/models/domain';
import {LocationModel} from '@app/repository/location_repository.model';
import {Location} from '@app/models/location';
import {DistrictService} from '@app/services/district.service';
import {DomainService} from '@app/services/domain.service';
import {LocationService} from '@app/services/location.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private districtModel: DistrictModel,
              private domainModel: DomainModel,
              private locationModel: LocationModel,
              private districtService: DistrictService,
              private domainService: DomainService,
              private locationService: LocationService,
  ) {
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

  editDistrict(districtId: number, districtName: string): void {
    const district: District = this.getDistrict(districtId);
    district.districtName = districtName;
    this.districtService.updateDistrict(district).subscribe( );
    }

  createDistrict(districtName: string): void {
    const district: District = new District();
    district.districtName = districtName;
    this.districtService.saveDistrict(district).subscribe( );
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
    this.domainService.updateDomain(domain).subscribe( );
  }

  createDomain(domainName: string): void {
    const domain: Domain = new Domain();
    domain.domainName = domainName;
    this.domainService.saveDomain(domain).subscribe( );
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

  editLocation(locationId: number, locationName: string, districtId: number): void {
    const location: Location = this.getLocation(locationId);
    location.locationName = locationName;
    location.district_id = districtId;
    this.locationService.updateLocation(location).subscribe( );
  }

  createLocation(locationName: string, districtId: number): void {
    const location: Location = new Location();
    const district: District = this.getDistrict(districtId);
    location.locationName = locationName;
    district.district_id = districtId;
    this.locationService.saveLocation(location).subscribe( );
  }
}
