import {User} from './user';
import {Comment} from './comment';

export class Likes{
  comment: Comment;
  user: User;

  constructor(comment: Comment, user: User) {
    this.comment = comment;
    this.user = user;
  }
}
