import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '@app/service/user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  myForm: FormGroup;
  submitted = false;
  id: string;
  token: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    route.queryParams.subscribe(params => {
      this.id = params.id;
      this.token = params.token;
    });
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      password2: ['']
    }, {validator: this.checkPasswords });
  }

  get f() { return this.myForm.controls; }

  checkPasswords(group: FormGroup): any { // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('password2').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit(): void {
    if (this.myForm.get('password').value != this.myForm.get('password2').value){
      alert('Passwords are not identical');
    } else if (this.myForm.get('password').value.length < 8) {
      alert('Passwords must contains at least 8 symbols');
    } else {

      this.userService.savePassword(this.id, this.token, this.myForm.get('password').value, this.myForm.get('password2').value).subscribe();
      this.router.navigate(['login']);
    }
  }
}
