import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.css']
})
export class AddProblemComponent implements OnInit {
// selectedFile: File = null;

  addProblemForm: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
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

  onSubmit(data): any{
    const controls = this.addProblemForm.controls;

    if (this.addProblemForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      return;
    }

    /** TODO: Обработка данных формы */
    console.log(this.addProblemForm.value);
    console.log(data);
  }

}
