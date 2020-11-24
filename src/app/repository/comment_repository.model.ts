import {Injectable} from '@angular/core';
import {Comment} from '../models/comment';
import {CommentService} from '../service/comment.service';

@Injectable()
export class CommentModel{
  private comment: Comment[] = new Array<Comment>();
  private commentService: CommentService;
  private locator = (c: Comment, id: number) => c.comment_id == id;

  getComment(id: number): Comment{
    return this.comment.find(c => this.locator(c, id));
  }

  saveComment(comment: Comment): void{
    if (comment.comment_id == 0 || comment.comment_id == null){
      this.commentService.saveComment(comment)
        .subscribe(c => this.comment.push(c));
    } else {
      this.commentService.updateComment(comment).subscribe(c => {
        const index = this.comment
          .findIndex(item => this.locator(item, c.comment_id));
        this.comment.splice(index, 1, c);
      });
    }
  }

}
