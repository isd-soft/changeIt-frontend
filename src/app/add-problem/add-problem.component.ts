import {AfterViewInit, Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@app/models/location';
import {LocationModel} from '@app/repository/location_repository.model';
import {District} from '@app/models/district';
import {DistrictModel} from '@app/repository/district_repository.model';
import {Domain} from '@app/models/domain';
import {DomainModel} from '@app/repository/domain_repository.model';
import {Problem} from '@app/models/problem';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.css']
})
export class AddProblemComponent implements OnInit {
// selectedFile: File = null;
  show: boolean = false;
  addProblemForm: FormGroup;
  problem: Problem = new Problem();
  location: Location = new Location();
  district: District = new District();
  domain: Domain = new Domain();

  constructor(private fb: FormBuilder,
              private problemModel: ProblemModel,
              private locationModel: LocationModel,
              private districtModel: DistrictModel,
              private domainModel: DomainModel) {
  }

  ngOnInit(): void {
    this.initForm();
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
      domain: ['', [
        Validators.required
      ]
      ],
      file: ['', []],

    });
  }

  // onFileSelected(event: any): any {
  //   this.selectedFile = (event.target.files[0] as File);
  // }
  //
  // onUpload(): any {
  //   const fd = new FormData();
  //   fd.append('image', this.selectedFile, this.selectedFile.name);
  //   this.http.post('', fd, {
  //     reportProgress: true,
  //     observe: 'events'
  //
  //   }).subscribe(event => {
  //     if (event.type === HttpEventType.UploadProgress) {
  //       console.log('Upload progress:' + Math.round(event.loaded / event.total * 100) + '%');
  //     } else if (event.type === HttpEventType.Response) {
  //       console.log(event);
  //     }
  //   });
  // }

  onSubmit(data): any {

    const controls = this.addProblemForm.controls;
    if (this.addProblemForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
    }

    // /** TODO: Обработка данных формы */
    // console.log(this.addProblemForm.value);
    //
    // if (typeof data.title !== 'undefined' && data.title) {
    //   console.log('not empty');
    // } else {
    //   console.log('empty');
    //   // alert('Title is empty');
    // }
    //
    // if (typeof data.description !== 'undefined' && data.description) {
    //   console.log('not empty');
    // } else {
    //   console.log('empty');
    //   // alert('Description is empty');
    // }
    //
    // if (typeof data.location !== 'undefined' && data.location) {
    //   console.log('not empty');
    // } else {
    //   console.log('empty');
    //   // alert('Location is empty');
    // }
    //
    // if (typeof data.district !== 'undefined' && data.district) {
    //   console.log('not empty');
    // } else {
    //   console.log('empty');
    //   // alert('District is empty');
    // }
    //
    // if (typeof data.domain !== 'undefined' && data.domain) {
    //   console.log('not empty');
    // } else {
    //   console.log('empty');
    //   // alert('Domain is empty');
    // }
    data.status = 'ACTIVE';
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
    console.log(disctrictID);

  }

}

