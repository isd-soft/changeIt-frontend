import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@app/models/location';
import {LocationModel} from '@app/repository/location_repository.model';
import {District} from '@app/models/district';
import {DistrictModel} from '@app/repository/district_repository.model';
import {Domain} from '@app/models/domain';
import {DomainModel} from '@app/repository/domain_repository.model';
import {Problem} from '@app/models/problem';
import {ProblemModel} from '@app/repository/problem_repository.model';
import { MapsAPILoader} from '@agm/core';
import {AccountService} from '@app/service';
import LatLngLiteral = google.maps.LatLngLiteral;


@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.css']
})
export class AddProblemComponent implements OnInit {
  // // selectedFile: File = null;
  // fileToUpload: File = null;

  show: boolean = false;

  addProblemForm: FormGroup;
  problem: Problem = new Problem();
  location: Location = new Location();
  district: District = new District();
  domains: Domain = new Domain();
  userId: number;

// Variables for Google Maps
  latitude: number = 47.059;
  longitude: number = 28.88;
  centerLatitude = this.latitude;
  centerLongitude = this.longitude;
  zoom: number = 15;
  private geoCoder;


address: string;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private fb: FormBuilder,
              private problemModel: ProblemModel,
              private locationModel: LocationModel,
              private districtModel: DistrictModel,
              private domainModel: DomainModel,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private accountService: AccountService) {
    this.userId = this.accountService.userValue.user_id;
  }

  ngOnInit(): void {
    this.initForm();
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

    });
  }
  putMarkerOnMap(event): any {
    var e = (document.getElementById('district')) as HTMLSelectElement;
    var address = e.options[e.selectedIndex].text + ' ' + event.target.value;
    this.problemModel.getLatLang(address).subscribe(addr => {
      console.log(addr.results[0].geometry.location);
      this.centerLatitude = addr.results[0].geometry.location.lat;
      this.centerLongitude = addr.results[0].geometry.location.lng;
      this.longitude = this.centerLongitude;
      this.latitude = this.centerLatitude;
      this.zoom = 10;

    });
  }

  markerDragEnd($event: google.maps.MouseEvent): any {
    console.log($event);
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    console.log(this.latitude);
    console.log(this.longitude);
  }

  getLocations(): Location[] {
    return this.locationModel.getLocations();
  }

  getDistricts(): District[] {
    return this.districtModel.getDistricts();
  }

  getDomains(): Domain[] {
    return this.domainModel.getDomains();
  }

  initForm(): void {
    this.addProblemForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.pattern(/[A-z]/)
      ]
      ],
      description: ['', [
        Validators.required
      ]
      ],
      location: ['', [
        Validators.required
      ]
      ],
      district: ['', [
        Validators.required
      ]
      ],
      address: ['', [
        Validators.required
      ]
      ],
      domains: ['', [
        Validators.required
      ]
      ],
      file: ['', []],

    });
  }

  get f(): any{
    return this.addProblemForm.controls;
  }

   onSubmit(data, event: any): any{
    // console.log(data);

    const controls = this.addProblemForm.controls;
    if (this.addProblemForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
    }
    data.status = 'ACTIVE';
    data.votesCount = 0;
    data.location = JSON.parse('{ "location_id": ' + data.location + ', "district": { "district_id": ' + data.district + ' }}');
    delete data.district;
    let domn: string;
    domn = '[';
    let lenght = data.domains.length - 1;
    for (let key in data.domains) {
      let value = data.domains[key];
      domn += '{"domain_id": ' + value + '}';
      // @ts-ignore
      if (lenght != key) {
        domn += ',';
      }
    }
    domn += ']';
    data.domains = JSON.parse(domn);
    data.address = JSON.parse('{"address" : "' + data.address + '", "lat": ' + this.latitude + ', "lng": ' + this.longitude + '}');
    data.user = JSON.parse('{"user_id": ' + this.userId + '}');
    // data.image = this.fileToUpload;
    // console.log(data);
    this.problemModel.saveProblem(data);

  }

  changeLocation(disctrictID): any {
    if (disctrictID === '0') {
      this.show = false;
    } else {
      this.show = true;
    }
    this.addProblemForm.get('location').markAsUntouched();
    this.addProblemForm.get('location').markAsPristine();
    this.addProblemForm.get('location').setErrors({incorrect: true});
    // console.log(disctrictID);

  }


  public centerChanged(coords: LatLngLiteral): any {
    this.centerLatitude = coords.lat;
    this.centerLongitude = coords.lng;
  }

  public mapReady(map): any {
    map.addListener('dragend', () => {
      console.log(this.latitude);
      console.log(this.longitude);
      // do something with centerLatitude/centerLongitude
    });
  }
}

