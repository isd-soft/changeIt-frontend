import { Component, OnInit } from '@angular/core';
import {User} from '@app/models';
import {AccountService} from '@app/services';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user: User;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
    console.log(this.user);
  }

  ngOnInit(): void {
  }

}
