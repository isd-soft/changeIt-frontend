import { Component, OnInit } from '@angular/core';
import {AccountService} from '@app/service';
import {User} from '@app/models';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '@app/repository/user_repository.model';
import {Comment} from '@app/models/comment';
import {CommentService} from '@app/service/comment.service';
import {ProblemService} from '@app/service/problem.service';
import {Problem} from '@app/models/problem';
import {UserService} from '@app/service/user.service';
import {parseStatementForUmdModule} from '@angular/compiler-cli/ngcc/src/host/umd_host';
@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css']
})
export class UserShowComponent implements OnInit {
  user: User = new User();
  comments: Comment[];
  problems: Problem[];
  logo: string;
  userRole: User;


  constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              private userModel: UserModel,
              private commentService: CommentService,
              private problemService: ProblemService,
              private router: Router,
              private userService: UserService) {

    route.params.subscribe(params => {
      const id = params.id;
      if (id != null) {
        this.user = userModel.getUser(id);
      }
    });
    this.accountService.user.subscribe(x => this.userRole = x);
  }

  ngOnInit(): void {
    this.commentService.getCommentsByUserId(this.user.user_id).subscribe(data => {
      this.comments = data;
    });

    this.problemService.getProblemsByUserId(this.user).subscribe(data => {
      this.problems = data;
    });

    this.accountService.getUserLogo(this.user.user_id).subscribe(data => {
      if (data.logo){
        this.logo = 'data:image/png;base64,' + data.logo;
      } else {
        this.logo = 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg';
      }
    });
  }
  changeStatus(): void {
    var status  = (document.getElementById('changeStatus') as HTMLInputElement).value;
    this.userService.updateUser(this.user.user_id, status).subscribe();
    window.location.reload();
  }

  removeUserLogo(id: number): void {
    this.accountService.deleteUserLogo(this.user.user_id).subscribe();
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(`/user-show/${this.user.user_id}`);
    });
  }

}
