import {Injectable} from "@angular/core";
import {LocationService} from "@app/services/location.service";
import {Location} from "../models/location"


@Injectable()
export class LocationModel{
  private location: Location[] = new Array<Location>();

  constructor(private locationService: LocationService) {
    this.locationService.getAllLocations().subscribe(location =>
     this.location = location
    );
  }


  getAllLocations(): Location[]{
   return this.location;
  }
}
