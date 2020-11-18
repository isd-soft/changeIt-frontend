import {Injectable} from '@angular/core';
import {Location} from '../models/location';
import {LocationService} from '../services/location.service';

@Injectable()
export class LocationModel {
  private location: Location[] = new Array<Location>();
  private locator = (l: Location, id: number) => l.location_id == id;

  constructor(private locationService: LocationService) {
    this.locationService.getData().subscribe(data => this.location = data);
  }
  getLocations(): Location[] {
    return this.location;
  }
  getLocation(id: number): Location {
    return this.location.find(l => this.locator(l, id));
  }

  saveLocation(location: Location): void {
    if (location.location_id == 0 || location.location_id == null) {
      this.locationService.saveLocation(location)
        .subscribe(l => this.location.push(l));
    } else {
      this.locationService.updateLocation(location).subscribe(l => {
        const index = this.location
          .findIndex(item => this.locator(item, l.location_id));
        this.location.splice(index, 1, l);
      });
    }
  }

  deleteLocation(id: number): void {
    this.locationService.deleteLocation(id).subscribe(() => {
      const index = this.location.findIndex(l => this.locator(l, id));
      if (index > -1) {
        this.location.splice(index, 1);
      }
    });
  }

}
