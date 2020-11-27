import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '@app/models';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '@app/repository/user_repository.model';
import {Comment} from '@app/models/comment';
import {CommentService} from '@app/service/comment.service';
import {UserService} from '../service/user.service';
import {CommentModel} from '../repository/comment_repository.model';


@Injectable()
export class UserShowResolver {

  constructor(
    private model: UserModel,
    private dataSource: UserService,
    private commentModel: CommentModel,
    private commentService: CommentService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<User[]> {

    if (this.model.getUsers().length == 0) {
      // this.messages.reportMessage(new Message('Loading data...'));
      return this.dataSource.getData();
    }
  }
}
