import {Injectable} from '@angular/core';
import {Location} from '../models/location';
import {LocationService} from '../service/location.service';


@Injectable()
export class LocationModel {
  private locations: Location[] = new Array<Location>();
  private locator = (l: Location, id: number) => l.location_id == id;

  constructor(private locationService: LocationService) {
    this.locationService.getData().subscribe(data => this.locations = data);
  }
  getLocations(): Location[] {
    return this.locations;
  }
  getLocation(id: number): Location {
    return this.locations.find(l => this.locator(l, id));
  }

  saveLocation(location: Location): void {
    if (location.location_id == 0 || location.location_id == null) {
      this.locationService.createLocation(location)
        .subscribe(l => this.locations.push(l));
    } else {
      this.locationService.updateLocation(location).subscribe(l => {
        const index = this.locations
          .findIndex(item => this.locator(item, l.location_id));
        this.locations.splice(index, 1, l);
      });
    }
  }

  deleteLocation(id: number): void {
    this.locationService.deleteLocation(id).subscribe(() => {
      const index = this.locations.findIndex(l => this.locator(l, id));
      if (index > -1) {
        this.locations.splice(index, 1);
      }
    });
  }

  getAllLocations() {
    return this.locations;
  }
}
