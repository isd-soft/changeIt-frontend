import { Component, OnInit } from '@angular/core';
import {UserModel} from '@app/repository/user_repository.model';
import {User} from '@app/models';
import {CommentService} from '@app/service/comment.service';
import {Observable} from 'rxjs';
import {UserService} from '@app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  rate: number = 0;
  constructor(private userModel: UserModel, private commentService: CommentService, private userService: UserService){
  }

  ngOnInit(): void {
    this.getUsers();

  }
  getUsers(): any {
    this.users = this.userModel.getUsers();

    this.users.forEach((user, key) => {
      this.users[key].rate = 0;
      this.commentService.getCommentsByUserId(user.user_id).subscribe(data => {
        data.forEach(item => {
          this.users[key].rate += item.votes;
        });
      });
    });
  }

  changeStatus(user_id: number): void {
    this.userService.updateUser(user_id, 'BANNED').subscribe();
    window.location.reload();
  }

}
