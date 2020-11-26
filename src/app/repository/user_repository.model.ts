import {Injectable} from '@angular/core';
import {User} from '../models';
import {UserService} from '../service/user.service';


@Injectable()
export class UserModel {
  private user: User[] = new Array<User>();
  private locator = (l: User, id: number) => l.user_id == id;

  constructor(private userService: UserService) {
    this.userService.getData().subscribe(data => this.user = data);
  }
  getUsers(): User[] {
    return this.user;
  }
  getUser(id: number): User {
    return this.user.find(l => this.locator(l, id));
  }

}
