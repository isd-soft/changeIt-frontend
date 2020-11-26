import { Component, OnInit } from '@angular/core';
import {UserModel} from '@app/repository/user_repository.model';
import {User} from '@app/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userModel: UserModel) { }

  ngOnInit(): void {
  }
  getUsers(): User[] {
    return this.userModel.getUsers();

  }

}
