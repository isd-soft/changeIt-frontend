import { Component, OnInit } from '@angular/core';
import {User} from '@app/models';
import {AccountService} from '@app/service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user: User;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }

  getDecodedAccessToken(token: string): any {
    try{
      return jwtDecode(token);
    }
    catch (Error){
      return null;
    }
  }

  Decode(): void{
    const tokenInfo = this.getDecodedAccessToken(this.user.token);
    console.log(tokenInfo);
  }

  ngOnInit(): void {
  }
}
