import {Component, OnInit} from '@angular/core';
import {User} from '@app/models';
import {AccountService} from '@app/service';
import {Router} from '@angular/router';
import {UserService} from '@app/service/user.service';
import {UserLogo} from '@app/models/userLogo';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user: User;
  verificationToken: string;
  userLogo: UserLogo;

  constructor(private accountService: AccountService, private router: Router, private userService: UserService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
  }

  onClick(): void {
    this.userService.getVerificationToken(this.user.email).subscribe(
      data => {
        this.verificationToken = data.token;
        this.router.navigate(['new-password'], {queryParams: {id: this.user.user_id, token: this.verificationToken}} );
      }, error => console.log(error));
  }

}
