import { Component, OnInit } from '@angular/core';
import {AccountService} from '@app/service';
import {User} from '@app/models';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '@app/repository/user_repository.model';
import {Comment} from '@app/models/comment';
import {CommentService} from '@app/service/comment.service';
import {ProblemService} from '@app/service/problem.service';
import {Problem} from '@app/models/problem';
@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css']
})
export class UserShowComponent implements OnInit {
  user: User = new User();
  comments: Comment[];
  problems: Problem[];


  constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              private userModel: UserModel,
              private commentService: CommentService,
              private problemService: ProblemService) {
    route.params.subscribe(params => {
      const id = params.id;
      if (id != null) {
        this.user = userModel.getUser(id);
      }
    });
  }

  ngOnInit(): void {
    this.commentService.getCommentsByUserId(this.user).subscribe(data => {
      this.comments = data;
    });

    this.problemService.getProblemsByUserId(this.user).subscribe(data => {
      this.problems = data;
    });
  }


}
