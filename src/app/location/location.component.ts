import { Component, OnInit } from '@angular/core';
import {Location} from '@app/models/location';
import {ActivatedRoute} from '@angular/router';
import {LocationModel} from '@app/repository/location_repository.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  location: Location = new Location();

  constructor(private route: ActivatedRoute, private locationModel: LocationModel) {
    route.params.subscribe(params => {
      const id = params.id;
      if (id != null) {
        Object.assign(this.location, locationModel.getLocation(id));
      }
    });
  }

  ngOnInit(): void {
  }

}
