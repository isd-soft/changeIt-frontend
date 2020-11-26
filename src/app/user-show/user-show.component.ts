import { Component, OnInit } from '@angular/core';
import {AccountService} from '@app/service';
import {User} from '@app/models';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '@app/repository/user_repository.model';
import {Comment} from '@app/models/comment';
import {CommentService} from '@app/service/comment.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css']
})
export class UserShowComponent implements OnInit {
  user: User = new User();
  comments: Comment[];


  constructor(private accountService: AccountService, private route: ActivatedRoute, private userModel: UserModel, private commentService: CommentService) {
    route.params.subscribe(params => {
      const id = params.id;
      console.log(id);
      if (id != null) {
        Object.assign(this.user, userModel.getUser(id));
      }
      console.log(this.user);
    });
  }

  ngOnInit(): void {
    console.log(this.commentService.getCommentsByUserId(this.user));
    this.commentService.getCommentsByUserId(this.user).subscribe(data => {
      this.comments = data;
    });
    console.log(this.comments);
  }


}
