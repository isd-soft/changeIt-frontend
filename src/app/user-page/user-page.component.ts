import { Component, OnInit } from '@angular/core';
import {User} from '@app/models';
import {AccountService} from '@app/service';
import {Router} from "@angular/router";
import {UserService} from "@app/service/user.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user: User;
  verificationToken: string;
  selectedFile: File;

  constructor(private accountService: AccountService, private router: Router, private userService: UserService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
  }

  onFileSelected(event): void {
    this.selectedFile = (event.target.file as File);
  }

  onUpload(): void {
/*    const fd = new FormData();
    fd.append('userLogo', this.selectedFile, 'fileName');*/
    this.accountService.saveUserLogo(this.selectedFile);
  }

  onClick() {
    this.userService.getVerificationToken(this.user.email).subscribe(
      data => {
        this.verificationToken = data.token;
        this.router.navigate(['new-password'], {queryParams: {id: this.user.user_id, token: this.verificationToken}} );
      }, error => console.log(error))
  }
}
